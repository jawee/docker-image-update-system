export interface DockerImage {
  id: number;
  status: number;
  created_on: string;
  modified_on: string;
  name: string;
  user: string;
  tag: string;
  repository: string;
  image_last_updated: string;
}

export enum Status {
  ACTIVE = 1,
  INACTIVE = 0,
}
