import { GithubClient } from "./repository-clients/github-client";
import { DockerHubClient } from "./repository-clients/dockerhub-client";
import { IRepositoryClient } from "./repository-clients/irepositoryclient";
import { APIClient } from "./internal-client";

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

  public async start() {
    const images = await this.apiClient.getActiveDockerImages(); 
    console.log(images);
  }

}

