import { Post } from "../entity/post";
import { PostRepository } from "../entity/posts.repository";

export const createPost = async (
  posts: Post,
  postsRepository: PostRepository,
) => {
  return await postsRepository.createPost(posts);
};
