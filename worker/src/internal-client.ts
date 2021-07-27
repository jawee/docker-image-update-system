import axios from "axios";
import { DockerImage, Status } from "./models/docker-image";

export class APIClient {
  constructor() {

  }

  public async getActiveDockerImages(): Promise<DockerImage[]> {
    return new Promise<DockerImage[]>((resolve, reject) => {
      const fetchStr = "http://localhost:3000/api/docker-images/";
        axios.get<DockerImage[]>(fetchStr, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        const res = resp.data.filter(r => r.status === Status.ACTIVE);
        resolve(res);
      }).catch((err) => reject(err)); 
    });
  }

  public async updateDockerImage(image: DockerImage): Promise<DockerImage> {
    return new Promise<DockerImage>((resolve, reject) => {
      const fetchStr = "http://localhost:3000/api/docker-images/"+image.id;
        axios.put<DockerImage>(fetchStr, image, { headers: { "Content-Type": "application/json", } }).then((resp) => {
        const res = resp.data;
        resolve(res);
      }).catch((err) => reject(err));
    });
  };

}
