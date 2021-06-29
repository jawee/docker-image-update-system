import React, { useEffect } from "react";
//import { DockerImageService } from "./services/docker-image-service";
import DockerImages, { DockerImage, DockerImagesProps } from "./DockerImages";

//const service = new DockerImageService();
//const res = service.getAllImages();

function App() {
  const [dockerImages, setDockerImages] = React.useState<
    Partial<DockerImagesProps>
  >({});
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    fetch("http://localhost:3000/api/docker-images")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        var dockerImages: DockerImagesProps = { dockerImages: json };
        setDockerImages(dockerImages);
      });
  }, []);

  return (
    <div>
      <h1>Hello React</h1>
      <DockerImages dockerImages={dockerImages.dockerImages} />
    </div>
  );
}

export default App;
