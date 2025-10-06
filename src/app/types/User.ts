import { Post } from "./Post";
import { Role } from "./Role";

export type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  posts?: Post[];
  createdAt?: Date;
  updatedAt?: Date;
};
