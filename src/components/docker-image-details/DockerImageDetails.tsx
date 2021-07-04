import React, { useEffect } from "react";
import DockerImage from "./../../models/DockerImage";
import DockerImageService from "./services/docker-image-service";
import { Link, useParams } from "react-router-dom";

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
      <ul>
        <li>
          <span className="title">Id</span>
          {dockerImage.id}
        </li>
        <li>
          <span className="title">Name</span>
          {dockerImage.name}
        </li>
        <li>
          <span className="title">Tag</span>
          {dockerImage.tag}
        </li>
        <li>
          <span className="title">User</span>
          {dockerImage.user}
        </li>
        <li>
          <span className="title">Created on</span>
          {dockerImage.created_on}
        </li>
        <li>
          <span className="title">Modified on</span>j{dockerImage.modified_on}
        </li>
        <li>
          <span className="title">Repository</span>
          {dockerImage.repository}
        </li>
        <li>
          <span className="title">Status</span>
          {dockerImage.status === 1 ? "Active" : "Inactive"}
        </li>
        <li>
          <span className="title">Image last updated</span>
          {dockerImage.image_last_updated}
        </li>
        <li>
          <Link to={`/dockerimage/${dockerImage.id}/edit`}>Edit</Link>
        </li>
        <li>
          <button>Delete</button>
        </li>
      </ul>
    </div>
  );
};

export default DockerImageDetails;
