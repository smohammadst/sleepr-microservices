import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) { }

    async create(createUserDto: CreateUserDto) {
        return this.userRepository.create(createUserDto)
    }
}
