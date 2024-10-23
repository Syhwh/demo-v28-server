import { Like } from "../../like/entity/Like";

export interface Post {
  id: number;
  content: string;
  images: string[];
  emoticons: string[];
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface PostInput {
  content: string;
  images: string[];
  authorId: number;
}