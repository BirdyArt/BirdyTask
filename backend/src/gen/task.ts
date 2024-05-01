import { User } from "./user";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Task {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  status: string = "new";

  @ApiPropertyOptional({ type: String })
  description?: string;

  @ApiProperty({ type: Number })
  userId: number;

  @ApiProperty({ type: () => User })
  user: User;
}
