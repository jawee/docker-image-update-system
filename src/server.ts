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
    this.routes();
  }

  public configuration() {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  public async routes() {
    console.log("Creating connection");
    await createConnection();
    console.log("Connection should be created");

    this.dockerImageController = new DockerImageController();

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
