import DockerImage from "../models/DockerImage";

class DockerImageService {
  public getDockerImage = async (id: number) => {
    const result = await fetch("http://localhost:3000/api/docker-images/" + id)
      .then((res) => res.json())
      .then((json) => {
        var results = json;
        return results;
      });
    return result;
  };

  public getAllImages = async () => {
    const result = await fetch("http://localhost:3000/api/docker-images")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        var results = json; // as DockerImage[];
        return results;
      });
    return result;
  };

  public updateDockerImage = async (id: number, image: DockerImage) => {
    const result = await fetch(
      "http://localhost:3000/api/docker-images/" + id,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(image),
      }
    )
      .then((res) => res.json())
      .then((json) => json);

    return result;
  };
}

export default DockerImageService;
