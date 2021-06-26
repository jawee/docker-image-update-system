import { PrimaryGeneratedColumn, Column } from "typeorm";

export enum Status {
  ACTIVE = 1,
  INACTIVE = 0,
}

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  status: number;

  @Column({ type: "datetime" })
  created_on: string;

  @Column({ type: "datetime" })
  modified_on: string;
}
