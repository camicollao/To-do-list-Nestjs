import { Get,Req, Post, Controller, Param, ParseIntPipe, Body, UseGuards } from '@nestjs/common';
import {User} from './entities/users.entity';
import {CreateUserDto} from './dto/create-user.dto'; 
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly jwtService: JwtService,) {}

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number): Promise<User>{
    return this.usersService.findOneById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto, 
  @Req() request: Request): 
  Promise<User>{
    const token = request.headers.authorization.split(' ')[1];
    const data = this.jwtService.decode(token);
    console.log(data);
    return this.usersService.create(createUserDto);
  }

}

//roles, dockerizar, utilizar git