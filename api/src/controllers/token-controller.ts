import { Router } from "express";

interface TokenRequest {
  grant_type: string;
  code: string;
  redirect_uri: string;
  client_id: string;
  client_secret: string;
};

interface TokenReqponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
};
export class TokenController {
  private router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes() {

  }
}

