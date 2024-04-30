import { Get,Req, Post, Controller, Param, ParseIntPipe, Body, UseGuards, Patch, Delete } from '@nestjs/common';
import {User} from 'src/modules/users/entities/users.entity';
import {CreateUserDto} from 'src/modules/users/dto/create-user.dto'; 
import {UpdateUserDto} from 'src/modules/users/dto/update-user.dto'; 
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../roles/roles.emun';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly jwtService: JwtService) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number): Promise<User>{
    return this.usersService.findOneById(id);
  }

  @Get('/')
  findAll(): Promise<User[]>{
    return this.usersService.findAll();
  }

  @Post('/')
  create(@Body() createUserDto: CreateUserDto): 
  Promise<User>{
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @Roles(Role.Admin)
  async update(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
    await this.usersService.update(id, user);
    return ({
      msg: 'El usuario ha sido actualizado',
      updatedTask: user
    })
  }


  @UseGuards(AuthGuard)
  @Delete(':id')
  @Roles(Role.Admin)
  async remove( @Param('id', ParseIntPipe) id: number) : Promise<any> {
  await this.usersService.delete(id);
  return ({
    msg: 'El usuario ha sido eliminado',
  });
  }

}
