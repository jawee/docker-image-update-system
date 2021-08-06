import { getConnection } from "typeorm";
import { ClientCredentialRepository } from "./../repositories/client-credentials-repository";

export class ClientCredentialService {
  private clientCredentialRepository: ClientCredentialRepository;

  constructor() {
    this.clientCredentialRepository = getConnection().getCustomRepository(ClientCredentialRepository);
  }

  public async getByClientId(clientId: string) {
    if (clientId === null || clientId === "undefined") {
      return null;
    }

    const clientCredential = await this.clientCredentialRepository.findByClientId(clientId);
    return clientCredential;
  };
}
