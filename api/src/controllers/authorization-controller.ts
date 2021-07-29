import { Router, Response, Request } from "express";

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

  constructor() {
    this.router = Router();
    this.routes();
  }


  public routes() {

  }
}
