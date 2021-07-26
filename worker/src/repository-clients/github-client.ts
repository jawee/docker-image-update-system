import { IRepositoryClient } from "./irepositoryclient";
import axios from "axios";

export class GithubClient implements IRepositoryClient {
  constructor() {
    //TODO: Probably login?
  }
  public async getRepositories(user: string): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      const fetchStr = `https://api.github.com/users/${user}/repos`;
      axios
        .get<ReposResponse[]>(fetchStr)
        .then((resp) => {
          const res = resp.data;
          const result = res.map((e) => e.name) as string[];
          resolve(result);
        })
        .catch((err) => reject(err));
    });
  }

  public async getLastUpdatedForTag(
    user: string,
    name: string,
    tag: string = "latest"
  ): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const fetchStr = `https://api.github.com/repos/${user}/${name}/releases/latest`;
      axios
        .get<TagResponse>(fetchStr)
        .then((resp) => {
          const res = resp.data;
          resolve(res.created_at.toString());
        })
        .catch((err) => reject(err));
    });
  }
}

interface TagResponse {
  url: string;
  assets_url: string;
  upload_url: string;
  html_url: string;
  id: number;
  node_id: string;
  tag_name: string;
  target_commitish: string;
  name: string;
  draft: boolean;
  prerelease: boolean;
  created_at: Date;
  published_at: Date;
  assets: any[];
  tarball_url: string;
  zipball_url: string;
  body: string;
}

interface ReposResponse {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: Date;
  updated_at: Date;
  pushed_at: Date;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  forks_count: number;
  mirror_url?: any;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
}
