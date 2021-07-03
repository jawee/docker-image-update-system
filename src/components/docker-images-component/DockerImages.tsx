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

type DockerImageLineProps = {
  dockerImage: DockerImage;
};

const DockerImageLine = ({ dockerImage }: DockerImageLineProps) => {
  return (
    <tr>
      <td>{dockerImage.name}</td>
      <td>{dockerImage.tag}</td>
      <td>{dockerImage.image_last_updated}</td>
      <td>{dockerImage.status}</td>
    </tr>
  );
};

const DockerImages = () => {
  const [dockerImageProps, setDockerImageProps] =
    React.useState<DockerImagesProps>({} as DockerImagesProps);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const service = new DockerImageService();
    const getDockerImages = async () => {
      const res = await service.getAllImages();
      const props: DockerImagesProps = { dockerImages: res };
      setDockerImageProps(props);
      setLoading(false);
    };
    getDockerImages();
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }
  if (
    dockerImageProps === undefined ||
    dockerImageProps.dockerImages === undefined
  ) {
    return <h1>images or dockerImages undefined</h1>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Tag</th>
          <th>Last Updated</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {dockerImageProps.dockerImages.map((d) => (
          <DockerImageLine dockerImage={d} />
        ))}
      </tbody>
    </table>
  );
};
export default DockerImages;
/*<ul>
      {dockerImageProps.dockerImages.map((d) => (
        <li key={d.id}>
          {d.id}
          {d.name}
        </li>
      ))}
    </ul>
 */
