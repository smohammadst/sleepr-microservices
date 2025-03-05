import { HttpException, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';
@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) { }

    async create(createUserDto: CreateUserDto) {
        await this.validateCreateUserDto(createUserDto)
        return this.userRepository.create({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10)
        })
    }

    private async validateCreateUserDto(createUserDto: CreateUserDto) {
        try {
            await this.userRepository.findOne({ email: createUserDto.email })
        } catch (error) {
            return;
        }
        throw new UnprocessableEntityException("email already exists")
    }

    async verifyUser(email: string, password: string) {
        const user = await this.userRepository.findOne({ email });
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            throw new UnauthorizedException("Credentials are not valid");
        }
        return user;
    }

    async getUser(getUser: GetUserDto) {
        return this.userRepository.findOne(getUser)
    }
}
