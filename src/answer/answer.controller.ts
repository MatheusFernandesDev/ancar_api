import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import AnswerEntity from './interface/answer.entity';
import { CreateAnswerDto } from './dtos/createAnswerDto';
import { UpdateAnswerDto } from './dtos/updateAnswerDto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('answers')
@Controller('question')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Get(':id/answer')
  async getAnswers(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<Pagination<AnswerEntity>> {
    return this.answerService.getAnswers(page, limit);
  }

  @Post(':id/answer')
  async createAnswer(
    @Param('id') questionId: number,
    @Body() createAnswerDto: CreateAnswerDto,
  ): Promise<AnswerEntity> {
    return this.answerService.createAnswer(questionId, createAnswerDto);
  }

  @Put(':id/answer/:answerId')
  async updateAnswer(
    @Param('id') questionId: number,
    @Param('answerId') answerId: number,
    @Body() updateAnswerDto: UpdateAnswerDto,
  ): Promise<AnswerEntity> {
    return this.answerService.updateAnswer(
      questionId,
      answerId,
      updateAnswerDto,
    );
  }

  @Delete(':id/answer/:answerId')
  async deleteAnswer(
    @Param('id') questionId: number,
    @Param('answerId') answerId: number,
  ): Promise<void> {
    return this.answerService.deleteAnswer(questionId, answerId);
  }
}
