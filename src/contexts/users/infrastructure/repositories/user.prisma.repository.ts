import { prisma } from '../../../../database/database';
import { User } from '../../entity/user';
import { UserRepository } from '../../entity/user.repository';

export const userPrismaRepository: UserRepository = {

  getUserById: async (id: number) => {
    return await prisma.user.findUnique({ where: { id } });
  },
  createUser: async (user: User) => {
    return await prisma.user.create({ data: user });
  },
  updateUser: async (id: number, user: User) => {
    return await prisma.user.update({ where: { id }, data: user });
  },
  deleteUser: async (id: number) => {
    return await prisma.user.delete({ where: { id } });
  },
  getUserByEmail: async (email: string) => {
    return await prisma.user.findUnique({ where: { email } });
  },
};
