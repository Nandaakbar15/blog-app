import { Category } from "./Category";
import { User } from "./User";
import { Status } from "./Status";

export type Post = {
  id?: number;
  title: string;
  slug: string;
  content: string;
  thumbnail?: string;
  status: Status;
  authorId?: number;
  categoryId?: number;
  author?: User;
  category?: Category;
  createdAt?: Date;
  updatedAt?: Date;
};
