import { IsBoolean, IsString } from "class-validator";
// import { PartialType } from '@nestjs/mapped-types';
// import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto{
    @IsString({
        message: 'name debe ser un string'
    })
    name: string;
    @IsBoolean({
        message: 'done debe ser un booleano'
    })
    done: boolean;
}
