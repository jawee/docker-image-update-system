import { Router, Response, Request } from "express";
import { DockerImageService } from "../services/docker-image-service";
import { DockerImage } from "../entities/DockerImage";

export class DockerImageController {
  public router: Router;
  private dockerImageService: DockerImageService;

  constructor() {
    this.router = Router();
    this.dockerImageService = new DockerImageService();
    this.routes();
  }

  public index = async (_: Request, res: Response) => {
    const result = await this.dockerImageService.index();
    return res.send(result);
  };

  public get = async (req: Request, res: Response) => {
    const id: number = +req.params.id;
    const result = await this.dockerImageService.get(id);
    return res.send(result);
  };

  public create = async (req: Request, res: Response) => {
    console.log(req["body"]);
    const dockerImage: DockerImage = req["body"] as DockerImage;
    if (dockerImage === undefined) {
      return res.sendStatus(400);
    }
    console.log(dockerImage);
    const newDockerImage: DockerImage = await this.dockerImageService.create(
      dockerImage
    );
    res.send(newDockerImage);
  };

  public update = async (req: Request, res: Response) => {
    console.log(req.params);
    const id: number = +req.params.id;
    const dockerImage: DockerImage = req["body"] as DockerImage;
    const updatedDockerImage = await this.dockerImageService.update(
      id,
      dockerImage
    );
    console.log("Updated docker image", updatedDockerImage);
    res.send(updatedDockerImage);
  };

  public delete = async (req: Request, res: Response) => {
    const result = this.dockerImageService.delete(+req.params.id);
    res.send(result);
  }

  public routes() {
    this.router.get("/", this.index);
    this.router.get("/:id", this.get);
    this.router.post("/", this.create);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
  }
}
