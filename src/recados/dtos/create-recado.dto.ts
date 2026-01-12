import { IsNotEmpty, IsPositive, IsString, MaxLength } from 'class-validator';

export class CreateRecadoDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly texto: string;

  @IsPositive()
  deId: number;

  @IsPositive()
  paraId: number;
}
