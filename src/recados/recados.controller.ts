import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDTO } from 'src/recados/dtos/create-recado.dto';
import { UpdateRecadoDTO } from './dtos/update-recado.dto';
import { PaginationDTO } from 'src/common/dto/pagination.dto';

@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}
  @Get()
  async findAll(@Query() paginationDTO: PaginationDTO) {
    const recados = await this.recadosService.findAll(paginationDTO);

    return recados;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.recadosService.findOne(id);
  }

  @Post()
  create(@Body() createRecadoDTO: CreateRecadoDTO) {
    return this.recadosService.create(createRecadoDTO);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecadoDTO: UpdateRecadoDTO,
  ) {
    return this.recadosService.update(id, updateRecadoDTO);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.recadosService.remove(id);
  }
}
