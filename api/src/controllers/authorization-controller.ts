import { Router, Response, Request } from "express";
import { ClientCredentialService } from "../services/client-credential-service";

interface AuthorizationRequest {
  response_type: string;
  client_id: string;
  redirect_uri: string;
  scope: string;
  state: string;
};

interface AuthorizationResponse {
  code: string;
  state: string;
};

export class AuthorizationController {
  private router: Router;
  private clientCredentialService: ClientCredentialService;

  constructor() {
    this.router = Router();
    this.clientCredentialService = new ClientCredentialService();
    this.routes();
  }


  public get = async(req: Request, res: Response) => {
    const clientId = req.params.client_id;
    const clientCredential = this.clientCredentialService.getByClientId(clientId);
    if(!clientCredential) {
      res.status(401).send({ error: "No client_id found" });
    }

  };
  public routes() {

  }
}
