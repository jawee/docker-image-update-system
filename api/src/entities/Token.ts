import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("tokens")
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column()
  redirect_uri: string;
  @Column()
  scope: string;
  @Column()
  code: string;
  
  @Column({ type: "datetime"})
  code_create_at: Date;

  @Column()
  code_expires_in: number;

  @Column()
  access: string;

  @Column({ type: "datetime"})
  access_create_at: Date;

  @Column()
  access_expires_in: number;

  @Column()
  refresh: string;

  @Column({ type: "datetime"})
  refresh_create_at: Date;
  
  @Column()
  refresh_expires_in: number;
}











/*  ClientID         string        `bson:"ClientID"`
	UserID           string        `bson:"UserID"`
	RedirectURI      string        `bson:"RedirectURI"`
	Scope            string        `bson:"Scope"`
	Code             string        `bson:"Code"`
	CodeCreateAt     time.Time     `bson:"CodeCreateAt"`
	CodeExpiresIn    time.Duration `bson:"CodeExpiresIn"`
	Access           string        `bson:"Access"`
	AccessCreateAt   time.Time     `bson:"AccessCreateAt"`
	AccessExpiresIn  time.Duration `bson:"AccessExpiresIn"`
	Refresh          string        `bson:"Refresh"`
	RefreshCreateAt  time.Time     `bson:"RefreshCreateAt"`
	RefreshExpiresIn time.Duration `bson:"RefreshExpiresIn"`*/
