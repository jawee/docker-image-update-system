export interface IRepositoryClient {
  getRepositories(user: string): Promise<string[]>;

  getLastUpdatedForTag(
    user: string,
    name: string,
    tag: string
  ): Promise<string>;
}
