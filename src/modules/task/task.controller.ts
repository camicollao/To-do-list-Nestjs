import { Controller, Get,Patch, Post, Body, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtService } from '@nestjs/jwt';



@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService,
    private readonly jwtService: JwtService) {}
  

  @Post('/')
  async create(@Body() newTask: CreateTaskDto) : Promise<any> {
    this.taskService.create(newTask);
    return({
      msg: 'Tarea agregada',
      task: newTask
    });
  }

  @Get('/')
  async findAll() : Promise<Task[]>{
    return this.taskService.findAll();
  }


  @Get(':id')
  async find(@Param('id', ParseIntPipe) id : number) : Promise<Task> {
  return this.taskService.findOne(id);
  }


  // @Put(':id')
  // async update(
  //   @Param('id', ParseIntPipe) id: number, @Body() CreateTaskDto: CreateTaskDto) : Promise<any> {
  //   const editedTask = await this.taskService.update(id, CreateTaskDto);
  //   return({
  //     message: 'Tarea ha sido actualizada',
  //     task: editedTask,
  //   });
  // }


  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() task: UpdateTaskDto) {
    await this.taskService.update(id, task);
    return ({
      msg: 'La Tarea ha sido actualizada',
      updatedTask: task
    })
  }


  @Delete(':id')
  async remove( @Param('id', ParseIntPipe) id: number) : Promise<any> {
  await this.taskService.remove(id);
  return ({
    msg: 'Tarea ha sido eliminada',
  });
  }
  }
