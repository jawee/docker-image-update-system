import React, { useEffect } from "react";
import DockerImage from "./../../models/DockerImage";
import DockerImageService from "./services/docker-image-service";
import { useParams } from "react-router-dom";

type DockerImageDetailsParams = {
  id: string;
};

const DockerImageDetails = () => {
  const [dockerImage, setDockerImage] = React.useState<DockerImage>(
    {} as DockerImage
  );
  const [loading, setLoading] = React.useState<boolean>(true);

  let { id } = useParams<DockerImageDetailsParams>();
  useEffect(() => {
    const service: DockerImageService = new DockerImageService();
    const getDockerImage = async () => {
      const res = await service.getDockerImage(+id);
      setDockerImage(res);
      setLoading(false);
    };
    getDockerImage();
  }, [id]);

  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      {dockerImage.id}
      {dockerImage.name}
    </div>
  );
};

export default DockerImageDetails;
