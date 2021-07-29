import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("client_credentials")
export class ClientCredential {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  client_id: string;

  @Column()
  client_secret: string;

  @Column()
  domain: string;

  @Column()
  user_id: string;
}
