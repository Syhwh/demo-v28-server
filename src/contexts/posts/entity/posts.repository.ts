import { Post, PostInput } from "./Post";


export interface PostRepository {
    getPosts(): Promise<Post[]>;
    getPostById(id: number): Promise<Post | null>;
    createPost(post: PostInput): Promise<Post>;
    updatePost(id: number, post: Partial<Post>): Promise<Post>;
    deletePost(id: number): Promise<Post>;
    getPostsByAuthorId(authorId: number): Promise<Post[]>;
  }