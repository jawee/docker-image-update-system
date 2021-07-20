import express, { Request, Response } from "express";
import morgan, { StreamOptions } from "morgan";
//import dotenv from "dotenv";
import cors from "cors";
import { createConnection } from "typeorm";

import { DockerImageController } from "./controllers/docker-image-controller";

const stream: StreamOptions = {
  // Use the http severity
  write: (message) => console.log(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream, skip }
);

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
    this.app.use(cors());
    this.app.use(morganMiddleware);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  public async routes() {
    this.dockerImageController = new DockerImageController();

    this.app.get("/", (req: Request, res: Response) => {
      res.send("Hello world");
    });
    this.app.use("/api/docker-images/", this.dockerImageController.router);
  }

  public start() {
    this.app.listen(this.app.get("port"), () => {
      console.log(`Server is listening on port ${this.app.get("port")}. `);
    });
  }
}
