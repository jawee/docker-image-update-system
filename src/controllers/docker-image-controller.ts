import { Router, Response, Request } from "express";
import { DockerImageService } from "../services/docker-image-service";

export class DockerImageController {
  public router: Router;
  private dockerImageService: DockerImageService;

  constructor() {
    this.router = Router();
    this.dockerImageService = new DockerImageService();
    this.routes();
  }

  public index = async (req: Request, res: Response) => {
    res.send(this.dockerImageService.index());
  };

  public get = async (req: Request, res: Response) => {
    //    res.send(this.dockerImageService.get_by_id(req.params.id));
    res.send(this.dockerImageService.get(req.params.id));
  };

  public create(req: Request, res: Response) {
    res.send(this.dockerImageService.create());
  }

  public update(req: Request, res: Response) {
    res.send(this.dockerImageService.update());
  }

  public delete(req: Request, res: Response) {
    res.send(this.dockerImageService.delete());
  }

  public routes() {
    this.router.get("/", this.index);
    this.router.get("/:id", this.get);
    this.router.post("/", this.create);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
  }
}
