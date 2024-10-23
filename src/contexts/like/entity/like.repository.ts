import { Like } from "./Like";


export interface LikeRepository {
  getLikes(): Promise<Like[]>;
  getLikeById(id: number): Promise<Like | null>;
  createLike(like: Partial<Like>): Promise<Like>;
  updateLike(id: number, like: Partial<Like>): Promise<Like>;
  deleteLike(id: number): Promise<Like>;
  getLikesByPostId(postId: number): Promise<Like[]>;
}