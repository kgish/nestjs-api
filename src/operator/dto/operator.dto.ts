import { IsNotEmpty, IsString } from 'class-validator';

export class OperatorDto {
  @IsString()
  @IsNotEmpty()
  readonly code: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
