import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from '@prisma/generated';
import { ProductsService } from '../../services/products/products.service';

@ApiTags('Products')
@Controller('hydrate-rest/products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ status: 201, description: 'Product created successfully' })
    create(@Body() createProductDto: Omit<Product, 'id'>): Promise<Product> {
        return this.productsService.create(createProductDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all products' })
    @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
    findAll(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a product by ID' })
    @ApiParam({ name: 'id', required: true, description: 'The ID of the product to retrieve' })
    @ApiResponse({ status: 200, description: 'Product retrieved successfully' })
    findOne(@Param('id') id: string): Promise<Product | null> {
        return this.productsService.findOne(id);
    }

    @Get('slug/:slug')
    @ApiOperation({ summary: 'Get a product by slug' })
    @ApiParam({ name: 'slug', required: true, description: 'The product by slug' })
    @ApiResponse({ status: 200, description: 'Product retrieved successfully' })
    findBySlug(@Param('slug') slug: string): Promise<Product | null> {
        return this.productsService.findBySlug(slug);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a product by ID' })
    @ApiParam({ name: 'id', required: true, description: 'The product update successfully' })
    @ApiResponse({ status: 200, description: 'Product updated successfully' })
    update(
        @Param('id') id: string,
        @Body() updateProductDto: Partial<Omit<Product, 'id'>>
    ): Promise<Product | null> {
        return this.productsService.update(id, updateProductDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a product by ID' })
    @ApiParam({ name: 'id', required: true, description: 'The ID of the product to delete' })
    @ApiResponse({ status: 204, description: 'Product deleted successfully' })
    remove(@Param('id') id: string): Promise<Product> {
        return this.productsService.remove(id);
    }
}
