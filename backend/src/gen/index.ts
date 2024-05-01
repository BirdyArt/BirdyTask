import { User as _User } from "./user";
import { Task as _Task } from "./task";

export namespace PrismaModel {
  export class User extends _User {}
  export class Task extends _Task {}

  export const extraModels = [User, Task];
}
