import "reflect-metadata";
import { Server } from "./server";
import { createConnection } from "typeorm";
createConnection()
  .then(async () => {
    const server = new Server();
    server.start();
  })
  .catch((error) => console.log(error));
