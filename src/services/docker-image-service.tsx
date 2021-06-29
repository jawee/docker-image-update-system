//import { DockerImage } from "./../DockerImages";

export class DockerImageService {
  public getAllImages = async () => {
    const result = await fetch("http://localhost:3000/api/docker-images")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        var results = json; // as DockerImage[];
        //console.log(results);
        return results;
      });
    //    console.log(result);
    return result;
  };
}
