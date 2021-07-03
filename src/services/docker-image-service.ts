import { getConnection } from "typeorm";
import { DockerImageRepository } from "./../repositories/docker-image-repository";
import { DockerImage } from "./../entities/DockerImage";

export class DockerImageService {
  private dockerImageRepository: DockerImageRepository;
  constructor() {
    this.dockerImageRepository = getConnection().getCustomRepository(
      DockerImageRepository
    );
  }

  public index = async () => {
    //    console.log("Getting all docker images");
    const dockerImages = await this.dockerImageRepository.find();
    //   console.log("Returning from service", dockerImages);
    return dockerImages;
  };

  public get = async (id: number) => {
    //console.log(`Getting docker image with id '${id}'`);
    const dockerImage = await this.dockerImageRepository.findOne(id);
    return dockerImage;
  };

  public create = async (dockerImage: DockerImage) => {
    dockerImage.id = null;
    dockerImage.created_on = new Date().toUTCString();
    dockerImage.modified_on = new Date().toUTCString();
    dockerImage.image_last_updated = new Date().toUTCString();
    const newDockerImage = await this.dockerImageRepository.save(dockerImage);
    return newDockerImage;
  };

  public update = async (id: number, dockerImage: DockerImage) => {
    let newImage: DockerImage = {} as DockerImage;
    newImage.name = dockerImage.name;
    newImage.id = dockerImage.id;
    newImage.image_last_updated = dockerImage.image_last_updated;
    newImage.repository = dockerImage.repository;
    newImage.tag = dockerImage.tag;
    newImage.user = dockerImage.user;
    newImage.status = dockerImage.status;
    newImage.modified_on = new Date().toUTCString();

    // TODO: Doesn't return updated image, so for now I get the updated image after update.
    await this.dockerImageRepository.update(id, newImage);

    const updatedDockerImage = await this.dockerImageRepository.findOne(id);

    return updatedDockerImage;
  };

  public delete = () => {
    return "Delete From Service";
  };
}
