import { Injectable, NotFoundException } from '@nestjs/common';
import AskinsEntity from './interface/askins.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { UpdateAskinDto } from './dtos/updateAskinDto';
import { CreateAskinDto } from './dtos/createAskinDto';
import QuestionEntity from 'src/question/interface/question.entity';

@Injectable()
export class AskinsService {
  constructor(
    @InjectRepository(AskinsEntity)
    private readonly askinsRepository: Repository<AskinsEntity>,
  ) {}

  async createAskins(createAskinDto: CreateAskinDto): Promise<AskinsEntity> {
    const newaskins = this.askinsRepository.create({
      description: createAskinDto.description,
      question_id: createAskinDto.question_id,
    });
    return this.askinsRepository.save(newaskins);
  }
  async getAskinss(
    page: number = 1,
    limit: number = 10,
  ): Promise<Pagination<AskinsEntity>> {
    const queryBuilder = this.askinsRepository.createQueryBuilder('askins');
    queryBuilder.orderBy('askins.id', 'ASC');

    return paginate<AskinsEntity>(queryBuilder, { page, limit });
  }

  async getQuestionsByQuestionnaireId(
    questionId: number,
  ): Promise<AskinsEntity[]> {
    return this.askinsRepository.find();
  }

  async getAskin(id: number): Promise<AskinsEntity> {
    return this.askinsRepository.findOne({ where: { id } });
  }

  async updateAskins(
    id: number,
    updateaskinsDto: UpdateAskinDto,
  ): Promise<AskinsEntity> {
    const askins = await this.askinsRepository.findOne({ where: { id } });
    if (!askins) {
      throw new NotFoundException('askins not found');
    }

    askins.description = updateaskinsDto.description;

    return this.askinsRepository.save(askins);
  }

  async partialUpdateAskins(
    id: number,
    updateaskinsDto: UpdateAskinDto,
  ): Promise<AskinsEntity> {
    const askins = await this.askinsRepository.findOne({ where: { id } });
    if (!askins) {
      throw new NotFoundException('askins not found');
    }
    await this.askinsRepository.update(id, updateaskinsDto);
    return;
  }

  async deleteAskins(id: number): Promise<void> {
    const askins = await this.askinsRepository.findOne({ where: { id } });
    if (!askins) {
      throw new NotFoundException('askins not found');
    }

    await this.askinsRepository.remove(askins);
  }
}
