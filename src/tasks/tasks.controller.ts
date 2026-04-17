import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';
import { UserRole } from '../users/entities/user.entity';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    create(
        @CurrentUser('id') userId: string,
        @Body() dto: CreateTaskDto,
    ) {
        return this.tasksService.create(userId, dto);
    }

    @Roles(UserRole.ADMIN)
    @Get('admin/all')
    findAllTasks() {
        return this.tasksService.findAll();
    }

    @Get()
    findMyTasks(@CurrentUser('id') userId: string) {
        return this.tasksService.findAllByUser(userId)
    }

    @Roles(UserRole.ADMIN)
    @Get('user/:userId')
    findTasksByUser(@Param('userId') userId: string) {
        return this.tasksService.findAllByUser(userId);
    }

    @Get(':id')
    findOne(
        @CurrentUser('id') userId: string,
        @Param('id') id: string,
        @CurrentUser('role') userRole: UserRole,
    ) {
        if (userRole === UserRole.ADMIN) {
            return this.tasksService.findOneById(id);
        }

        return this.tasksService.findOne(id, userId)
    }

    @Patch(':id')
    update(
        @CurrentUser('id') userId: string,
        @Param('id') id: string,
        @Body() dto: UpdateTaskDto
    ) {
        return this.tasksService.update(id, userId, dto);
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
