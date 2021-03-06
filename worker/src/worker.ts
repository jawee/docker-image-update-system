import { GithubClient } from "./repository-clients/github-client";
import { DockerHubClient } from "./repository-clients/dockerhub-client";
import { IRepositoryClient } from "./repository-clients/irepositoryclient";
import { APIClient } from "./internal-client";
import { DockerImage } from "./models/docker-image";
import { DiscordClient } from "./discord-client";

interface IClientHash {
  [name: string]: IRepositoryClient;
}

export class Worker {
  private clients: IClientHash = {};
  private apiClient: APIClient;
  constructor() {
    this.clients["docker"] = new DockerHubClient();
    this.clients["github"] = new GithubClient();
    this.apiClient = new APIClient();
  }

  public async run() {
    const images = await this.apiClient.getActiveDockerImages(); 
    const imagesToBeUpdated = await this.imagesToBeUpdated(images);
    this.notifyDiscord(imagesToBeUpdated);
    this.updateImages(imagesToBeUpdated);
  }

  private async notifyDiscord(images: DockerImage[]) {
    const client = new DiscordClient();
    client.notifyDiscord(images);
 }

  private async updateImages(images: DockerImage[]) {
    for(const image of images) {
      await this.apiClient.updateDockerImage(image);
    }
  }

  private async imagesToBeUpdated(images: DockerImage[]): Promise<DockerImage[]> {
    return new Promise<DockerImage[]>(async (resolve, _) => {
      const list: DockerImage[] = [];
      for(const image of images) {
        const repoClient = this.clients[image.repository];
        const res = await repoClient.getLastUpdatedForTag(image.user, image.name, image.tag);
        const resultDate = new Date(res);
        const currentDate = new Date(image.image_last_updated);
        if(resultDate > currentDate) {
          image.image_last_updated = res;
          list.push(image);
        }
      }
      resolve(list);
    });
  }

}
