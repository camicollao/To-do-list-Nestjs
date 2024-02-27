import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import {hashSync, genSaltSync} from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>){}

    async findOneById(id: number): Promise<User>{
        const user = await this.usersRepository.findOne({
            where:{
                 id
                },
            });
        if(!user) throw new NotFoundException('User with that id is not found');
        return user;
    }

    async findOneByEmail(email : string): Promise<User>{
        const user = await this.usersRepository.findOne({
            where:{
                 email
                },
            });
        if(!user) throw new NotFoundException('User with that email is not found');
        return user;
    }


    async create(CreateUserDto: CreateUserDto): Promise<User>{
        const salt = genSaltSync(6);
        const hashPassword = hashSync(CreateUserDto.password, salt);
        CreateUserDto.password = hashPassword
        return await this.usersRepository.save(CreateUserDto);
    }
}
