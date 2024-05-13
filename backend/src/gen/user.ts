import { Task } from "./task";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class User {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  hash: string;

  @ApiPropertyOptional({ type: String })
  firstName?: string;

  @ApiPropertyOptional({ type: String })
  lastName?: string;

  @ApiProperty({ isArray: true, type: () => Task })
  tasks: Task[];
}
