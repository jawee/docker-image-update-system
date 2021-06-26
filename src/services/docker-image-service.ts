import { getConnection } from "typeorm";
import { DockerImageRepository } from "./../repositories/docker-image-repository";

export class DockerImageService {
  private dockerImageRepository: DockerImageRepository;
  constructor() {
    this.dockerImageRepository = getConnection().getCustomRepository(
      DockerImageRepository
    );
  }

  public index = async () => {
    console.log("Getting all docker images");
    const dockerImages = await this.dockerImageRepository.find();
    console.log("Returning from service", dockerImages);
    return dockerImages;
  };

  public get = async (id: number) => {
    console.log(`Getting docker image with id '${id}'`);
    const dockerImage = await this.dockerImageRepository.findOne(id);
    return dockerImage;
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
