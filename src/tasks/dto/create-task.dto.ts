import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @MinLength(3, { message: 'Title must have at least 3 characters' })
    @MaxLength(100, { message: 'The title must have at least 100 characters' })
    title!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    dueDate?: string;
}