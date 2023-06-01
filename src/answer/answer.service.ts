import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AnswerEntity from './interface/answer.entity';
import { Repository } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { CreateAnswerDto } from './dtos/createAnswerDto';
import { UpdateAnswerDto } from './dtos/updateAnswerDto';

@Injectable()
export class AnswerService {
  questionRepository: any;
  constructor(
    @InjectRepository(AnswerEntity)
    private readonly answerRepository: Repository<AnswerEntity>,
  ) {}

  async getAnswers(
    page: number = 1,
    limit: number = 10,
  ): Promise<Pagination<AnswerEntity>> {
    const queryBuilder = this.answerRepository.createQueryBuilder('answer');
    queryBuilder.orderBy('answer.id', 'ASC');

    return paginate<AnswerEntity>(queryBuilder, { page, limit });
  }

  async createAnswer(
    questionId: number,
    createAnswerDto: CreateAnswerDto,
  ): Promise<AnswerEntity> {
    const question = await this.questionRepository.findOne(questionId);

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    const answer = new AnswerEntity();
    answer.ask_id = question;
    answer.description = createAnswerDto.description;

    const createdAnswer = await this.answerRepository.save(answer);

    return createdAnswer;
  }

  async updateAnswer(
    questionId: number,
    answerId: number,
    updateAnswerDto: UpdateAnswerDto,
  ): Promise<AnswerEntity> {
    const answer = await this.answerRepository.findOne({
      where: { ask_id: questionId, id: answerId },
    });

    if (!answer) {
      throw new Error('Resposta não encontrada');
    }

    answer.description = updateAnswerDto.description;

    const updatedAnswer = await this.answerRepository.save(answer);

    return updatedAnswer;
  }

  async deleteAnswer(questionId: any, answerId: number): Promise<void> {
    const answer = await this.answerRepository.findOne({
      where: { id: answerId },
    });

    if (!answer) {
      throw new Error('Resposta não encontrada');
    }

    if (answer.ask_id !== questionId) {
      throw new Error('A resposta não pertence ao questionário especificado');
    }

    await this.answerRepository.delete(answerId);
  }
}
