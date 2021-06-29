import React from "react";

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

const DockerImages: React.FC<DockerImagesProps> = ({
  dockerImages,
}: DockerImagesProps) => {
  console.log(dockerImages);
  if (dockerImages === undefined) {
    return <div>Loading</div>;
  }
  return (
    <ul>
      {dockerImages.map((d) => (
        <li key={d.id}>
          {d.id}
          {d.name}
        </li>
      ))}
    </ul>
  );
};
export default DockerImages;
