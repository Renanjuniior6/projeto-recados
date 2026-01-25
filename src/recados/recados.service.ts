import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecadoDTO } from 'src/recados/dtos/create-recado.dto';
import { Recado } from './entities/recado.entity';
import { UpdateRecadoDTO } from './dtos/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoasService } from 'src/pessoas/pessoas.service';
import { PaginationDTO } from 'src/common/dto/pagination.dto';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
    private readonly pessoaService: PessoasService,
  ) {}

  throwRecadoError() {
    throw new NotFoundException('Recado não encontrado');
  }

  async findAll(paginationDTO: PaginationDTO) {
    const { limit = 10, offset = 0 } = paginationDTO;

    const recados = await this.recadoRepository.find({
      take: limit, // Estou limitando o número de registros por página assim como no SQL 'LIMIT'
      skip: offset, // Quantos registros devem ser pulados

      // Estou dizendo que quero que retorne as minhas relações também
      relations: ['de', 'para'],

      // Ordernar por id em ordem decrescente
      order: {
        id: 'DESC',
      },
      // Seleciono os campos que eu quero
      select: {
        de: {
          id: true,
          nome: true,
        },
        para: {
          id: true,
          nome: true,
        },
      },
    });

    return recados;
  }

  async findOne(id: number) {
    const recado = await this.recadoRepository.findOne({
      where: {
        id,
      },
      relations: ['de', 'para'],
      select: {
        de: {
          id: true,
          nome: true,
        },
        para: {
          id: true,
          nome: true,
        },
      },
    });

    if (recado) return recado;

    this.throwRecadoError();
  }

  async create(createRecadoDTO: CreateRecadoDTO) {
    const { deId, paraId, texto } = createRecadoDTO;

    const de = await this.pessoaService.findOne(deId);

    const para = await this.pessoaService.findOne(paraId);

    const novoRecado = {
      texto: texto,
      de,
      para,
      lido: false,
      data: new Date(),
    };

    const recado = this.recadoRepository.create(novoRecado);

    await this.recadoRepository.save(recado);

    return {
      ...recado,
      de: {
        id: recado.de.id,
      },
      para: {
        id: recado.para.id,
      },
    };
  }

  async update(id: number, updateRecadoDTO: UpdateRecadoDTO) {
    const recado = await this.findOne(id);

    if (!recado) return this.throwRecadoError();

    recado.texto = updateRecadoDTO?.texto ?? recado.texto;
    recado.lido = updateRecadoDTO?.lido ?? recado.lido;

    await this.recadoRepository.save(recado);

    return recado;
  }

  async remove(id: number) {
    const existentRecado = await this.recadoRepository.findOneBy({
      id,
    });

    if (!existentRecado) return this.throwRecadoError();

    await this.recadoRepository.remove(existentRecado);

    return 'Recado Removido!';
  }
}
