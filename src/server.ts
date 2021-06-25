import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import { createConnection } from "typeorm";

import { DockerImageController } from "./controllers/docker-image-controller";

export class Server {
  private app: express.Application;
  private dockerImageController: DockerImageController;

  constructor() {
    this.app = express();
    this.configuration();
    this.dockerImageController = new DockerImageController();
    this.routes();
  }

  public configuration() {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  public async routes() {
    await createConnection({
      name: "dockerimage",
      type: "sqlite",
      database: "database.sqlite",
      synchronize: true,
      logging: false,
      entities: ["entities/**/*.ts"],
      migrations: ["migration/**/*.ts"],
      cli: {
        entitiesDir: "entities",
        migrationsDir: "migration",
      },
    });

    this.app.get("/", (req: Request, res: Response) => {
      res.send("Hello world");
    });
    this.app.use("/api/docker-images/", this.dockerImageController.router);
  }

  public start() {
    this.app.listen(this.app.get("port"), () => {
      console.log(`Server is listening ${this.app.get("port")} port. `);
    });
  }
}
