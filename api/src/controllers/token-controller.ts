import { Request, Response, Router } from "express";
import { ClientCredentialService } from "../services/client-credential-service";
import base64url from "base64url";

interface TokenRequest {
  grant_type: string;
  code: string;
  redirect_uri: string;
  client_id: string;
  client_secret: string;
};

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};

interface JWT {
  iss: string;
  sub: string;
  aud: string;
  iat: number;
  exp: number;
  jti: string;
};

interface JWT_Header {
  typ: string;
  alg: string;
};

export class TokenController {
  private router: Router;
  private clientCredentialsService: ClientCredentialService;

  constructor() {
    this.router = Router();
    this.clientCredentialsService = new ClientCredentialService();
    this.routes();
  }

  public createToken = async (req: Request, res: Response) => {
    const tokenRequest = req["body"] as TokenRequest;
    if(tokenRequest.client_id === null || tokenRequest.client_id === "undefined") {
      res.status(400).send({ error: "No client_id in request" });
    }
    const clientCredential = await this.clientCredentialsService.getByClientId(tokenRequest.client_id);
    if(!clientCredential) {
      res.status(400).send({ error: "No client found" });
    }
    const jwtHeader = { typ: "JWT", alg: "HS256" } as JWT_Header;

    const jwtPayload = {} as  JWT;
    jwtPayload.iss = "http://localhost:3000";
    jwtPayload.sub = "dius";
    jwtPayload.iat = Math.floor(Date.now() / 1000);
    jwtPayload.exp = Math.floor(Date.now() / 1000) + (5 * 60);
    jwtPayload.jti = this.generateRandomString();

    const access_token = base64url.encode(JSON.stringify(jwtHeader)) + "." + base64url.encode(JSON.stringify(jwtPayload)) + ".";
    res.send(access_token);
  };


  private generateRandomString(length: number = 8): string {
    let outString: string = '';
    let inOptions: string = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
    }
    return outString;
  };



  public routes() {
    this.router.post("/token", this.createToken);
  }
}

