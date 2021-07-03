type DockerImage = {
  id: number;
  status: number;
  created_on: Date;
  modified_on: Date;
  name: string;
  user: string;
  tag: string;
  repository: string;
  image_last_updated: Date;
  [key: string]: any;
};

export default DockerImage;
