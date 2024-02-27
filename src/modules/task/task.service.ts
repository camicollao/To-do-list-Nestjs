import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import {Task} from '././entities/task.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';


@Injectable()
export class TaskService {

  constructor(@InjectRepository(Task) private taskRepository: Repository<Task>){}

  async create(task: CreateTaskDto) {
    const newTask = this.taskRepository.create(task)
    return this.taskRepository.save(newTask);
  }

  async findAll(): Promise<Task[]> {
    console.log('hola');
    return this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    const taskFound = await this.taskRepository.findOne({where: {id},
    });
    if(!taskFound){
      throw new HttpException('La tarea no pudo ser encontrada', HttpStatus.NOT_FOUND)
    }
    return taskFound;
  }

  async update(id: number, task: UpdateTaskDto) {
    console.log(id, task)
    const taskFound = this.taskRepository.findOne({where: {id}})
    if(!taskFound){
      throw new HttpException('La tarea no existe', HttpStatus.NOT_FOUND)
    }
    return this.taskRepository.update({id}, task);
  }

  async remove(id: number): Promise<any> {
    const taskFound = await this.taskRepository.findOne({where: {id}})
    if(!taskFound){
      throw new HttpException('La tarea no existe', HttpStatus.NOT_FOUND)
    }
    return this.taskRepository.softDelete({id});
  }
}
