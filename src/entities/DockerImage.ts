import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class DockerImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  user: string;

  @Column()
  tag: string;

  @Column()
  repository: string;
}
