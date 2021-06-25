import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";

import { DockerImageController } from "./controllers/docker-image-controller";

export class Server {
  private app: Express;
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

  public routes() {
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
