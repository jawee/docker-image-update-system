import { EntityRepository, Repository } from "typeorm";
import { DockerImage } from "../entities/DockerImage";

@EntityRepository(DockerImage)
export class DockerImageRepository extends Repository<DockerImage> {}
