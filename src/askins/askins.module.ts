import { Module } from '@nestjs/common';
import { AskinsController } from './askins.controller';
import { AskinsService } from './askins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import AskinsEntity from './interface/askins.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AskinsEntity])],
  controllers: [AskinsController],
  providers: [AskinsService],
})
export class AskinsModule {}
