import { PrismaClient } from '../generated/prisma/client';
import { randomUUID } from 'crypto';

export async function seedUsers(prisma: PrismaClient) {
  await prisma.user.create({
    data: {
      id: randomUUID(),
      name: 'Admin',
      email: 'admin@example.com',
      password: 'jwt_password',
      refreshToken: 'jwt_refresh_token',
    },
  });
}