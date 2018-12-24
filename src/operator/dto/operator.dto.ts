import { IsString } from 'class-validator';

export class OperatorDto {
  @IsString() readonly code: string;

  @IsString() readonly name: string;
}
