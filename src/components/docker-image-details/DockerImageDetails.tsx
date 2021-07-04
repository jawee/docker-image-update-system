import React, { useEffect } from "react";
import DockerImage from "./../../models/DockerImage";
import DockerImageService from "./services/docker-image-service";
import { Link, useParams } from "react-router-dom";

type DockerImageDetailsParams = {
  id: string;
};

type DockerImageDetailsLineParams = {
  name: string;
  value: any;
};

const DockerImageDetailsLine = ({
  name,
  value,
}: DockerImageDetailsLineParams) => {
  return (
    <li>
      <span className="title">{name}:</span>
      {value}
    </li>
  );
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
        <DockerImageDetailsLine name="Id" value={dockerImage.id.toString()} />
        <DockerImageDetailsLine name="Name" value={dockerImage.name} />
        <DockerImageDetailsLine name="Tag" value={dockerImage.tag} />
        <DockerImageDetailsLine name="User" value={dockerImage.user} />
        <DockerImageDetailsLine
          name="Created on"
          value={dockerImage.created_on}
        />
        <DockerImageDetailsLine
          name="Modified on"
          value={dockerImage.modified_on}
        />
        <DockerImageDetailsLine
          name="Repository"
          value={dockerImage.repository}
        />
        <DockerImageDetailsLine
          name="Status"
          value={dockerImage.status === 1 ? "Active" : "Inactive"}
        />
        <DockerImageDetailsLine
          name="Image last updated"
          value={dockerImage.image_last_updated}
        />
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
