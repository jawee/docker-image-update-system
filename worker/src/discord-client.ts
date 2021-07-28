import { DockerImage } from "./models/docker-image";
import axios from "axios";

export class DiscordClient {

  constructor() {
  }

  public async notifyDiscord(images: DockerImage[]) {
    for(const image of images) {
      await this.notifyDiscordForImage(image);
    }
  }

  private async notifyDiscordForImage(image: DockerImage) {
    const url = process.env.DISCORD_URL;
    if(typeof url !== "string") {
      console.log("url is not set");
      return;
    }

    const obj = {
      content: `New image found for ${image.user}/${image.name}:${image.tag} on ${image.repository}`, 
      username: "DIUS",
    };
    axios.post(url, obj);
  }
}
