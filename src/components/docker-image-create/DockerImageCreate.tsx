import React from "react";
import DockerImage from "./../../models/DockerImage";

const DockerImageCreate = () => {
  const [dockerImage, setDockerImage] = React.useState<DockerImage>(
    {} as DockerImage
  );
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    let key = event.currentTarget.name;
    let value =
      event.currentTarget.name === "status"
        ? event.currentTarget.checked
          ? 1
          : 0
        : event.currentTarget.value;
    let currentDockerImage = dockerImage;
    currentDockerImage[key] = value;
    setDockerImage({ ...dockerImage, [key]: value });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    /*const service: DockerImageService = new DockerImageService();
    const updateDockerImage = async () => {
      await service.updateDockerImage(+id, dockerImage);
      //  setDockerImage(res);
      //  setLoading(false);
      //  Redirect to details view
      history.push("/dockerimage/" + dockerImage.id);
      };
      updateDockerImage();*/
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
        <input name="repository" type="text" onChange={onChange} />
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
