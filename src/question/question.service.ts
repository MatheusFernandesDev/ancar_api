import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateQuestionDto } from './dtos/createQuestion.dto';
import QuestionEntity from './interface/question.entity';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateQuestionDto } from './dtos/updateQuestion.dto';
import AskinsEntity from 'src/askins/interface/askins.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
    @InjectRepository(AskinsEntity)
    private readonly askinsRepository: Repository<AskinsEntity>,
  ) {}

  async createQuestion(
    createQuestionDto: CreateQuestionDto,
  ): Promise<QuestionEntity> {
    const newQuestion = this.questionRepository.create({
      name: createQuestionDto.name,
      date: new Date(),
      description: createQuestionDto.description,
    });
    return this.questionRepository.save(newQuestion);
  }
  async getAskinsByQuestionId(questionId: number): Promise<any> {
    return this.questionRepository
      .createQueryBuilder('q')
      .select('q.id', 'id')
      .addSelect('q.name', 'name')
      .addSelect('a')
      .innerJoin(AskinsEntity, 'a', 'a.question_id = q.id')
      .where('q.id = :id', { id: questionId })
      .getRawMany();
  }

  async getQuestions(
    page: number = 1,
    limit: number = 10,
  ): Promise<Pagination<QuestionEntity>> {
    const queryBuilder = this.questionRepository.createQueryBuilder('question');
    queryBuilder.orderBy('question.id', 'ASC');

    return paginate<QuestionEntity>(queryBuilder, { page, limit });
  }

  async getQuestion(id: number): Promise<QuestionEntity> {
    return this.questionRepository.findOne({ where: { id } });
  }

  async updateQuestion(
    id: number,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<QuestionEntity> {
    const question = await this.questionRepository.findOne({ where: { id } });
    if (!question) {
      throw new NotFoundException('question not found');
    }

    (question.name = updateQuestionDto.name),
      (question.description = updateQuestionDto.description),
      (question.date = updateQuestionDto.date);

    return this.questionRepository.save(question);
  }

  async partialUpdateQuestion(
    id: number,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<QuestionEntity> {
    const question = await this.questionRepository.findOne({ where: { id } });
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    await this.questionRepository.update(id, updateQuestionDto);
    return;
  }

  async deleteQuestion(id: number): Promise<void> {
    const question = await this.questionRepository.findOne({ where: { id } });
    if (!question) {
      throw new NotFoundException('Question not found');
    }

    await this.questionRepository.remove(question);
  }
}
