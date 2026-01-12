import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDTO {
  @IsOptional()
  @IsInt()
  @Min(1) // número minímo aceitável
  @Max(50) // número máximo aceitável neste campo ou seja (número máximo de registros por página)
  @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number) // Transformação do campo para número
  offset: number;
}
