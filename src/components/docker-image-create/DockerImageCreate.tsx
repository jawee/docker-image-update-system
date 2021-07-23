import React from "react";
import DockerImage from "../../models/DockerImage";
import DockerImageService from "../../services/docker-image-service";
import { useHistory } from "react-router-dom";

const DockerImageCreate = () => {
  const [dockerImage, setDockerImage] = React.useState<DockerImage>({
    status: 1,
    repository: "docker",
  } as DockerImage);

  const selectOnChange = (event: React.FormEvent<HTMLSelectElement>) => {
    let key = event.currentTarget.name;
    let value = event.currentTarget.value;

    setDockerImage({ ...dockerImage, [key]: value });
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
  let history = useHistory();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const service: DockerImageService = new DockerImageService();
    const createDockerImage = async () => {
      const newImage = await service.createDockerImage(dockerImage);
      //  Redirect to details view
      history.push("/dockerimage/details/" + newImage.id);
    };
    createDockerImage();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create new</h1>
      <label htmlFor="name">
        Name
        <input name="name" type="text" onChange={onChange} />
      </label>
      <label htmlFor="repository">
        Repository
        <select name="repository" onChange={selectOnChange}>
          <option value="docker">Docker</option>
          <option value="github">Github</option>
        </select>
      </label>
      <label htmlFor="user">
        User
        <input name="user" type="text" onChange={onChange} />
      </label>
      <label htmlFor="tag">
        Tag
        <input name="tag" type="text" onChange={onChange} />
      </label>
      <label htmlFor="status">
        Active
        <input
          type="checkbox"
          name="status"
          onChange={onChange}
          checked={true}
        />
      </label>
      <input type="submit" value="Save" />
    </form>
  );
};

export default DockerImageCreate;
