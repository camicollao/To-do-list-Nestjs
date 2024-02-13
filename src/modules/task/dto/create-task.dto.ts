import { IsBoolean, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString({
        message: 'name debe ser un string'
    })
    name: string;
    @IsBoolean({
        message: 'done debe ser un booleano'
    })
    done: boolean;
}
