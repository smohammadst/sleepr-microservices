import { Body, Controller } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }
}
