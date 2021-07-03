import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import DockerImage from "./../../models/DockerImage";
import DockerImageService from "./services/docker-image-service";

type DockerImageEditParams = {
  id: string;
};

const DockerImageEdit = () => {
  const [dockerImage, setDockerImage] = React.useState<DockerImage>(
    {} as DockerImage
  );
  const [loading, setLoading] = React.useState<boolean>(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);
    console.log("Submit");
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    let key = event.currentTarget.name;
    let value = event.currentTarget.value;
    let currentDockerImage = dockerImage;
    currentDockerImage[key] = value;
    console.log("pre setDockerImage", currentDockerImage);
    setDockerImage({ ...dockerImage, [key]: value });
    console.log("post setDockerImage", dockerImage);
  };

  let { id } = useParams<DockerImageEditParams>();
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
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name
        <input
          name="name"
          type="text"
          value={dockerImage.name}
          onChange={onChange}
        />
      </label>
      <label htmlFor="repository">
        Repository
        <input
          name="repository"
          type="text"
          value={dockerImage.repository}
          onChange={onChange}
        />
      </label>

      <input type="submit" value="Save" />
    </form>
  );
};

export default DockerImageEdit;
