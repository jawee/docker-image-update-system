import { GithubClient } from "./repository-clients/github-client";
import { DockerHubClient } from "./repository-clients/dockerhub-client";
import { IRepositoryClient } from "./repository-clients/irepositoryclient";
import { APIClient } from "./internal-client";
import { DockerImage } from "./models/docker-image";

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
    console.log(`imagesToBeUpdated: ${imagesToBeUpdated}`);
  }

  public async imagesToBeUpdated(images: DockerImage[]): Promise<DockerImage[]> {
    return new Promise<DockerImage[]>(async (resolve, _) => {
      const list: DockerImage[] = [];
      for(const image of images) {
        console.log(`handling image: ${image.name} ${image.repository}`);
        const repoClient = this.clients[image.repository];
        const res = await repoClient.getLastUpdatedForTag(image.user, image.name, image.tag);
        console.log(`Res from client: ${res}`);
        list.push(image);
      }
      resolve(list);
    });
  }

}
