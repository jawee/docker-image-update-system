import React, { useEffect } from "react";
import DockerImage from "./../../models/DockerImage";
import DockerImageService from "../../services/docker-image-service";
import { Link, useParams, useHistory } from "react-router-dom";

type DockerImageDetailsParams = {
  id: string;
};

type DockerImageDetailsLineParams = {
  name: string;
  value: string;
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

  let history = useHistory();

  const [loading, setLoading] = React.useState<boolean>(true);

  const handleDelete = () => {
    const service: DockerImageService = new DockerImageService();
    const deleteDockerImage = async () => {
      debugger;
      await service.deleteDockerImage(dockerImage.id);
      history.push("/");
    };
    deleteDockerImage();
  };

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
          value={new Date(dockerImage.created_on).toLocaleString("sv-SE")}
        />
        <DockerImageDetailsLine
          name="Modified on"
          value={new Date(dockerImage.modified_on).toLocaleString("sv-SE")}
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
          value={new Date(dockerImage.image_last_updated).toLocaleString(
            "sv-SE"
          )}
        />
        <li>
          <Link to={`/dockerimage/details/${dockerImage.id}/edit`}>Edit</Link>
        </li>
        <li>
          <button onClick={handleDelete}>Delete</button>
        </li>
      </ul>
    </div>
  );
};

export default DockerImageDetails;
