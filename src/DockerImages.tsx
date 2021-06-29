import React, { useEffect } from "react";
import { DockerImageService } from "./services/docker-image-service";

export type DockerImage = {
  id: number;
  status: number;
  created_on: Date;
  modified_on: Date;
  name: string;
  user: string;
  tag: string;
  repository: string;
  image_last_updated: Date;
};
export type DockerImagesProps = {
  dockerImages: DockerImage[] | void;
};

const DockerImages: React.FC = () => {
  const [images, setImages] = React.useState<Partial<DockerImagesProps>>({});

  useEffect(() => {
    const service = new DockerImageService();
    const getDockerImages = async () => {
      const res = await service.getAllImages();
      const resObj: DockerImagesProps = { dockerImages: res };
      console.log("Setting images", resObj);
      setImages(resObj);
    };
    getDockerImages();
  }, []);

  if (images === undefined || images.dockerImages === undefined) {
    return <h1>images or dockerImages undefined</h1>;
  }
  return (
    <ul>
      {images.dockerImages.map((d) => (
        <li key={d.id}>
          {d.id}
          {d.name}
        </li>
      ))}
    </ul>
  );
};
export default DockerImages;
