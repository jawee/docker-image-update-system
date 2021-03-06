import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import DockerImage from "./../../models/DockerImage";
import DockerImageService from "../../services/docker-image-service";

type DockerImageEditParams = {
  id: string;
};

const DockerImageEdit = () => {
  const [dockerImage, setDockerImage] = React.useState<DockerImage>(
    {} as DockerImage
  );
  const [loading, setLoading] = React.useState<boolean>(true);
  let history = useHistory();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const service: DockerImageService = new DockerImageService();
    const updateDockerImage = async () => {
      await service.updateDockerImage(+id, dockerImage);
      //  Redirect to details view
      history.push("/dockerimage/details/" + dockerImage.id);
    };
    updateDockerImage();
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    let key = event.currentTarget.name;
    let value =
      event.currentTarget.name === "status"
        ? event.currentTarget.checked
          ? 1
          : 0
        : event.currentTarget.value;
    setDockerImage({ ...dockerImage, [key]: value });
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
      <label htmlFor="user">
        User
        <input
          name="user"
          type="text"
          value={dockerImage.user}
          onChange={onChange}
        />
      </label>
      <label htmlFor="tag">
        Tag
        <input
          name="tag"
          type="text"
          value={dockerImage.tag}
          onChange={onChange}
        />
      </label>
      <label htmlFor="status">
        Active
        <input
          type="checkbox"
          name="status"
          onChange={onChange}
          checked={dockerImage.status === 1}
        />
      </label>
      <input type="submit" value="Save" />
    </form>
  );
};

export default DockerImageEdit;
