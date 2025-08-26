import { Injectable } from '@nestjs/common';
import { User } from '@prisma/generated';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async findOne(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({ 
            where: { id } 
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email }
        });
    }

    async create(data: Omit<User, 'id'>): Promise<User> {
        return this.prisma.user.create({ 
            data: {
                id: crypto.randomUUID(),
                ...data
            }
        });
    }

    async update(id: string, data: Partial<Omit<User, 'id'>>): Promise<User> {
        return this.prisma.user.update({ 
            where: { id }, 
            data 
        });
    }

    async remove(id: string): Promise<User> {
        return this.prisma.user.delete({ 
            where: { id } 
        });
    }
}
