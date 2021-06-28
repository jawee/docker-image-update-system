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

const DockerImages = (images: DockerImage[]) => {
  console.log(images);
  return <h2>Test</h2>;
};
export default DockerImages;
