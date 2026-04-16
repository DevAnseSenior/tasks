import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    create(
        @CurrentUser('id') userId: string,
        @Body() createTaskDto: CreateTaskDto,
    ) {
        return this.tasksService.create(userId, createTaskDto);
    }

    @Get()
    findAll(@CurrentUser('id') userId: string) {
        return this.tasksService.findAllByUser(userId)
    }

    @Get(':id')
    findOne(
        @CurrentUser('id') userId: string,
        @Param('id') id: string,
    ) {
        return this.tasksService.findOne(id, userId)
    }

    @Patch(':id')
    update(
        @CurrentUser('id') userId: string,
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto
    ) {
        return this.tasksService.update(id, userId, updateTaskDto);
    }

    @Patch(':id/toggle')
    toggleComplete(
        @CurrentUser('id') userId: string,
        @Param('id') id: string
    ) {
        return this.tasksService.tooggleComplete(id, userId);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(
        @CurrentUser('id') userId: string,
        @Param('id') id: string,
    ) {
        return this.tasksService.remove(id, userId);
    }
}
