import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { AskinsModule } from './askins/askins.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.delopment.local'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      migrations: [`${__dirname}/migration/*{.ts,.js}`],
      migrationsRun: true,
    }),
    UserModule,
    QuestionModule,
    AnswerModule,
    AskinsModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
