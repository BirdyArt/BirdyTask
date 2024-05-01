import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { JwtGuard } from "../auth/guard";
import { TaskService } from "./task.service";
import { GetUser } from "../auth/decorator";
import { CreateTaskDto, EditTaskDto } from "./dto";
import { ApiOkResponse } from "@nestjs/swagger";
import { Task } from "../gen/task";

@UseGuards(JwtGuard)
@Controller("tasks")
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Get()
  @ApiOkResponse({ type: [Task] })
  getTasks(@GetUser("id") userId: number) {
    return this.taskService.getTasks(userId);
  }
  @Get(":id")
  @ApiOkResponse({ type: Task })
  getTaskById(
    @GetUser("id") userId: number,
    @Param("id", ParseIntPipe) taskId: number
  ) {
    return this.taskService.getTaskById(userId, taskId);
  }
  @Post()
  @ApiOkResponse({ type: Task })
  createTask(@GetUser("id") userId: number, @Body() dto: CreateTaskDto) {
    return this.taskService.createTask(userId, dto);
  }
  @Patch(":id")
  editTaskById(
    @GetUser("id") userId: number,
    @Body() dto: EditTaskDto,
    @Param("id", ParseIntPipe) taskId: number
  ) {
    return this.taskService.editTaskById(userId, dto, taskId);
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":id")
  deleteTaskById(
    @GetUser("id") userId: number,
    @Param("id", ParseIntPipe) taskId: number
  ) {
    return this.taskService.deleteTaskById(userId, taskId);
  }
}
