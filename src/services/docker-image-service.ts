import { getConnection, createConnection } from "typeorm";
import { DockerImageRepository } from "./../repositories/docker-image-repository";

export class DockerImageService {
  private dockerImageRepository: DockerImageRepository;
  constructor() {
    this.dockerImageRepository = getConnection(
      "dockerimage"
    ).getCustomRepository(DockerImageRepository);
  }

  public index = () => {
    return "Index From Service";
  };

  public get = (id) => {
    return `Get ${id} From Service`;
  };

  public create = () => {
    return "Create From Service";
  };

  public update = () => {
    return "Update From Service";
  };

  public delete = () => {
    return "Delete From Service";
  };
}
