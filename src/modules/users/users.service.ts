import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import {hashSync, genSaltSync} from 'bcrypt';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>){}

    async findAll(): Promise<User[]>{
        return this.usersRepository.find();
    }

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

    async update(id: number, user: UpdateUserDto){
        const userFound = this.usersRepository.findOne({where: {id}})
        if(!userFound){
            throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND)
        }
        return this.usersRepository.update({id}, user); 
    }

    async delete(id: number): Promise<any> {
        const userFound = this.usersRepository.findOne({where: {id}})
        if(!userFound){
            throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND)
        }
        return this.usersRepository.softDelete({id}); 
    }
}
