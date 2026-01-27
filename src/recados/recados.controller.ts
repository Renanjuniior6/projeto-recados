import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDTO } from 'src/recados/dtos/create-recado.dto';
import { UpdateRecadoDTO } from './dtos/update-recado.dto';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';
import { TimingConnectionInterceptor } from 'src/common/interceptors/timing-connection.interceptor';
import { ErrorhandlingInterceptor } from 'src/common/interceptors/error-handling.interceptor';
import { SimpleCacheInterceptor } from 'src/common/interceptors/simple-cache.interceptor';
import { ChangeDatainterceptor } from 'src/common/interceptors/change-data.interceptor';
import { AuthTokenInterceptor } from 'src/common/interceptors/auth-token.interceptor';
// import { ParseIntIdPipe } from 'src/common/pipes/parse-int-id.pipe';
@UseInterceptors(SimpleCacheInterceptor, AuthTokenInterceptor)
@Controller('recados')
// @UsePipes(ParseIntIdPipe)
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}
  @Get()
  @UseInterceptors(ChangeDatainterceptor, ErrorhandlingInterceptor)
  async findAll(@Query() paginationDTO: PaginationDTO) {
    const recados = await this.recadosService.findAll(paginationDTO);

    return recados;
  }

  @UseInterceptors(AddHeaderInterceptor, ErrorhandlingInterceptor)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.recadosService.findOne(id);
  }

  @Post()
  create(@Body() createRecadoDTO: CreateRecadoDTO) {
    return this.recadosService.create(createRecadoDTO);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRecadoDTO: UpdateRecadoDTO) {
    return this.recadosService.update(id, updateRecadoDTO);
  }

  @UseInterceptors(TimingConnectionInterceptor)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recadosService.remove(id);
  }
}
