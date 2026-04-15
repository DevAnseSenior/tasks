import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    ) {}

    async create(userId: string, dto: CreateTaskDto): Promise<Task> {
        const task = this.taskRepository.create({
            ...CreateTaskDto,
            userId,
        });
        return this.taskRepository.save(task);
    }

    async findAllByUser(userId: string): Promise<Task[]> {
        return this.taskRepository.find({
            where: { userId },
            order: { createAt: 'DESC'},
        });
    }

    async findOne(id: string, userId: string): Promise<Task> {
        const task = await this.taskRepository.findOne({
            where: { id, userId },
        });

        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        return task;
    }

    async update(id: string, userId: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
        const task = await this.findOne(id, userId);

        Object.assign(task, updateTaskDto);

        return this.taskRepository.save(task);
    }

    async remove(id: string, userId: string): Promise<void> {
        const result = await this.taskRepository.delete({ id, userId});

        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
    }

    async tooggleComplete(id: string, userId: string): Promise<Task> {
        const task = await this.findOne(id, userId);

        task.completed = !task.completed;

        return this.taskRepository.save(task);
    }
}
