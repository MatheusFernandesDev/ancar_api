import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import QuestionEntity from './interface/question.entity';
import AskinsEntity from 'src/askins/interface/askins.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity, AskinsEntity])],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
