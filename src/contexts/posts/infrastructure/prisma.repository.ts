import { prisma } from '../../../database/database';
import { Post } from '../entity/Post';
import { PostRepository } from '../entity/posts.repository';

export const postPrismaRepository: PostRepository = {
  getPosts: async () => {
    return await prisma.post.findMany();
  },
  getPostById: async (id: number) => {
    return await prisma.post.findUnique({ where: { id } });
  },
  createPost: async (post: Post) => {
    return await prisma.post.create({ data: post });
  },
  updatePost: async (id: number, post: Post) => {
    return await prisma.post.update({ where: { id }, data: post });
  },
  deletePost: async (id: number) => {
    return await prisma.post.delete({ where: { id } });
  },
  getPostsByAuthorId: async (authorId: number) => {
    return await prisma.post.findMany({ where: { authorId } });
  },
};
