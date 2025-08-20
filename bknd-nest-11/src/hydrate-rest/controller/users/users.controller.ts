import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../../services/users/users.service';
import { User } from '@prisma/generated';

@ApiTags('Users')
@Controller('hydrate-rest/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    create(@Body() createUserDto: Omit<User, 'id'>): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get('email/:email')
    @ApiOperation({ summary: 'Get a user by email' })
    @ApiParam({ name: 'email', type: String, description: 'Email of the user to retrieve' })
    @ApiResponse({ status: 200, description: 'User retrieved successfully' })
    findByEmail(@Param('email') email: string): Promise<User | null> {
        return this.usersService.findByEmail(email);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a user by ID' })
    @ApiParam({ name: 'id', type: String, description: 'ID of the user to update' })
    @ApiResponse({ status: 200, description: 'User updated successfully' })
    update(
        @Param('id') id: string, 
        @Body() updateUserDto: Partial<Omit<User, 'id'>>
    ): Promise<User | null> {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a user by ID' })
    @ApiParam({ name: 'id', type: String, description: 'ID of the user to delete' })
    @ApiResponse({ status: 204, description: 'User deleted successfully' })
    delete(@Param('id') id: string): Promise<User> {
        return this.usersService.remove(id);
    }
}