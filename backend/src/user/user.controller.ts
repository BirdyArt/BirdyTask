import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { GetUser } from "../auth/decorator";
import { JwtGuard } from "../auth/guard";
import { User as UserClient } from "@prisma/client";
import { EditUserDto } from "./dto";
import { UserService } from "./user.service";
import { ApiOkResponse } from "@nestjs/swagger";
import { User } from "../gen/user";

@UseGuards(JwtGuard)
@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}
  @Get("me")
  @ApiOkResponse({ type: User })
  getMe(@GetUser() user: UserClient) {
    return user;
  }

  @Patch()
  @ApiOkResponse({ type: User })
  editUser(@GetUser("id") userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
