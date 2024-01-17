import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateTaskDto, EditTaskDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}
  getTasks(userId: number) {
    return this.prisma.task.findMany({
      where: {
        userId,
      },
    });
  }
  async getTaskById(userId: number, taskId: number) {
    const task = await this.prisma.task.findFirst({
      where: {
        userId,
        id: taskId,
      },
    });
    return task;
  }
  async createTask(userId: number, dto: CreateTaskDto) {
    const task = await this.prisma.task.create({
      data: {
        userId,
        ...dto,
      },
    });
    return task;
  }
  async editTaskById(userId: number, dto: EditTaskDto, taskId: number) {
    // get the task by id
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    // check if user owns the task
    if (!task || task.userId !== userId)
      throw new ForbiddenException('Access to resource denied');

    // update the task
    return this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteTaskById(userId: number, taskId: number) {
    // get the task by id
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    // check if user owns the task
    if (!task || task.userId !== userId)
      throw new ForbiddenException('Access to resource denied');

    await this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }
}
