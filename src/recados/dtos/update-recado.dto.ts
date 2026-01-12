import { PartialType } from '@nestjs/mapped-types';
import { CreateRecadoDTO } from './create-recado.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateRecadoDTO extends PartialType(CreateRecadoDTO) {
  @IsBoolean()
  @IsOptional()
  readonly lido?: boolean;
}
