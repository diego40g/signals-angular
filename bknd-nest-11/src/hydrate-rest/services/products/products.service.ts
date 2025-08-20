import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/generated';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class ProductsService {
    constructor (private prisma: PrismaService) {}

    async findAll(): Promise<Product[]> {
        return this.prisma.product.findMany();
    }

    async findOne(id: string): Promise<Product | null> {
        return this.prisma.product.findUnique({ 
            where: { id } 
        });
    }

    async findBySlug(slug: string): Promise<Product | null> {
        return this.prisma.product.findUnique({ 
            where: { slug } 
        });
    }

    async create(data: Omit<Product, 'id'>): Promise<Product> {
        return this.prisma.product.create({ 
            data: {
                id: crypto.randomUUID(),
                ...data
            } 
        });
    }

    async update(id: string, data: Partial<Omit<Product, 'id'>>): Promise<Product> {
        return this.prisma.product.update({ 
            where: { id }, 
            data
        });
    }

    async remove(id: string): Promise<Product> {
        return this.prisma.product.delete({ 
            where: { id } 
        });
    }
}
