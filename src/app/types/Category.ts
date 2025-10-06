import { Post } from "./Post";

export type Category = {
  id?: number;
  name: string;
  slug: string;
  posts?: Post[];
  createdAt?: Date;
  updatedAt?: Date;
};
