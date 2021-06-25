import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";

class Server {
  private app: Express;

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

  public routes() {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Hello world");
    });
  }

  public start() {
    this.app.listen(this.app.get("port"), () => {
      console.log(`Server is listening $(this.app.get('port')} port. `);
    });
  }
}
export default Server;
