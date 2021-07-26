import axios from "axios";
import { IRepositoryClient } from "./irepositoryclient";

export class DockerHubClient implements IRepositoryClient {
  constructor() {
    // TODO: Probably create with api keys and things
  }

  public async getRepositories(user: string): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      const fetchStr = `https://hub.docker.com/v2/repositories/${user}`;
      axios
        .get<RepositoriesRespone>(fetchStr, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((resp) => {
          const res = resp.data.results;
          let result = res.map((e) => e.name) as string[];
          resolve(result);
        })
        .catch((err) => reject(err));
    });
  }

  public async getLastUpdatedForTag(
    user: string,
    name: string,
    tag: string
  ): Promise<string> {
    //https://hub.docker.com/v2/repositories/jawee/jenkins/tags/?page_size=100
    return new Promise<string>((resolve, reject) => {
      const fetchStr = `https://hub.docker.com/v2/repositories/${user}/${name}/tags`;
      axios
        .get<TagsResponse>(fetchStr, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((resp) => {
          var res = resp.data.results.find((r) => r.name == tag);
          if (res !== undefined) {
            resolve(res.last_updated.toString());
          } else {
            reject("Result for tag not found");
          }
        })
        .catch((err) => reject(err));
    });
  }
}

interface Image {
  architecture: string;
  features: string;
  variant?: any;
  digest: string;
  os: string;
  os_features: string;
  os_version?: any;
  size: number;
  status: string;
  last_pulled: Date;
  last_pushed: Date;
}

interface TagResult {
  creator: number;
  id: number;
  image_id?: any;
  images: Image[];
  last_updated: Date;
  last_updater: number;
  last_updater_username: string;
  name: string;
  repository: number;
  full_size: number;
  v2: boolean;
  tag_status: string;
  tag_last_pulled: Date;
  tag_last_pushed: Date;
}

interface TagsResponse {
  count: number;
  next: string;
  previous?: any;
  results: TagResult[];
}

interface RepositoryResult {
  user: string;
  name: string;
  namespace: string;
  repository_type: string;
  status: number;
  description: string;
  is_private: boolean;
  is_automated: boolean;
  can_edit: boolean;
  star_count: number;
  pull_count: number;
  last_updated: Date;
  is_migrated: boolean;
  collaborator_count: number;
  affiliation?: any;
  hub_user: string;
}

interface RepositoriesRespone {
  count: number;
  next?: any;
  previous?: any;
  results: RepositoryResult[];
}
