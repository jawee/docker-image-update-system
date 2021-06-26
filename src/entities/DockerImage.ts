import { Entity, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity("docker_images")
export class DockerImage extends BaseEntity {
  @Column()
  name: string;

  @Column()
  user: string;

  @Column()
  tag: string;

  @Column()
  repository: string;

  @Column({ type: "datetime" })
  image_last_updated: string;
}
