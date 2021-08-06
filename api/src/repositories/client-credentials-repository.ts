import { EntityRepository, Repository } from "typeorm";
import { ClientCredential } from "../entities/ClientCredential";

@EntityRepository(ClientCredential)
export class ClientCredentialRepository extends Repository<ClientCredential> {
  public findByClientId(clientId: string) : Promise<ClientCredential> {
    return this.findOne({ client_id: clientId});
  }
}
