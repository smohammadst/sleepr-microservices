import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { UsersService } from './users.service';
import { CurrentUser } from '../current-user.decorator';
import { UserDocument } from './model/users.schema';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getUser(@CurrentUser() user: UserDocument) {
        return user
    }
}
