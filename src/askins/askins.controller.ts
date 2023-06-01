import { Body, Controller, Get, Post } from '@nestjs/common';
import AskinsEntity from './interface/askins.entity';
import { CreateAskinDto } from './dtos/createAskinDto';
import { AskinsService } from './askins.service';

@Controller('askins')
export class AskinsController {
  constructor(private readonly askinsService: AskinsService) {}

  @Post()
  async createAskins(@Body() createAskins: CreateAskinDto) {
    console.log(createAskins);
    return this.askinsService.createAskins(createAskins);
  }
}
