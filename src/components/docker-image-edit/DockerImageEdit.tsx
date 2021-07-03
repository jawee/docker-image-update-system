import React from "react";
import { useParams } from "react-router-dom";

type DockerImageEditParams = {
  id: string;
};

const DockerImageEdit = () => {
  let { id } = useParams<DockerImageEditParams>();

  return <div>Edit Docker image with Id {id}</div>;
};

export default DockerImageEdit;
