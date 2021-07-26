import { GithubClient } from "./repository-clients/github-client";
import { DockerHubClient } from "./repository-clients/dockerhub-client";
import { IRepositoryClient } from "./repository-clients/irepositoryclient";

interface IClientHash {
  [name: string]: IRepositoryClient;
}
export class Worker {
  private clients: IClientHash = {};
  constructor() {
    this.clients["docker"] = new DockerHubClient();
    this.clients["github"] = new GithubClient();
  }

  public start() {
    
  }

}

