import { DockerHubClient } from "./clients/dockerhub-client";

console.log("Starting worker");

setInterval(() => {
  console.log("Running probably");
}, 3000);
