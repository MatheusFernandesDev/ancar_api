import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateQuestionDto } from './dtos/createQuestion.dto';
import { UpdateQuestionDto } from './dtos/updateQuestion.dto';
import { QuestionService } from './question.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import QuestionEntity from './interface/question.entity';
import AskinsEntity from 'src/askins/interface/askins.entity';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  async createQuestion(@Body() createQuestion: CreateQuestionDto) {
    return this.questionService.createQuestion(createQuestion);
  }

  @Get()
  async getQuestions(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<Pagination<QuestionEntity>> {
    return this.questionService.getQuestions(page, limit);
  }
  @Get(':questionId/askins')
  async getAskinsByQuestionId(@Param('questionId') questionId: number) {
    const askins = await this.questionService.getAskinsByQuestionId(questionId);
    return { data: askins };
  }

  @Get(':id')
  async getQuestion(@Param('id') id: number): Promise<QuestionEntity> {
    return this.questionService.getQuestion(id);
  }

  @Put(':id')
  async updateQuestion(
    @Param('id') id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ): Promise<QuestionEntity> {
    return this.questionService.updateQuestion(id, updateQuestionDto);
  }

  @Patch(':id')
  async partialUpdateQuestion(
    @Param('id') id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ): Promise<QuestionEntity> {
    return this.questionService.partialUpdateQuestion(id, updateQuestionDto);
  }

  @Delete(':id')
  async deleteQuestion(@Param('id') id: number): Promise<void> {
    return this.questionService.deleteQuestion(id);
  }
}
