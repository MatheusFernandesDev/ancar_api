import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import AskinsEntity from './interface/askins.entity';
import { CreateAskinDto } from './dtos/createAskinDto';
import { AskinsService } from './askins.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { UpdateAskinDto } from './dtos/updateAskinDto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('askins')
@Controller('askins')
export class AskinsController {
  constructor(private readonly askinsService: AskinsService) {}

  @Post()
  async createAskins(@Body() createAskins: CreateAskinDto) {
    console.log(createAskins);
    return this.askinsService.createAskins(createAskins);
  }
  @Get()
  getAskinss(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<AskinsEntity>> {
    return this.askinsService.getAskinss(page, limit);
  }

  @Get('question/:questionId')
  getQuestionsByQuestionnaireId(
    @Param('questionId', ParseIntPipe) questionId: number,
  ): Promise<AskinsEntity[]> {
    return this.askinsService.getQuestionsByQuestionnaireId(questionId);
  }

  @Get(':id')
  getAskin(@Param('id', ParseIntPipe) id: number): Promise<AskinsEntity> {
    return this.askinsService.getAskin(id);
  }

  @Put(':id')
  updateAskins(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAskinDto: UpdateAskinDto,
  ): Promise<AskinsEntity> {
    return this.askinsService.updateAskins(id, updateAskinDto);
  }

  @Patch(':id')
  partialUpdateAskins(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAskinDto: UpdateAskinDto,
  ): Promise<AskinsEntity> {
    return this.askinsService.partialUpdateAskins(id, updateAskinDto);
  }

  @Delete(':id')
  deleteAskins(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.askinsService.deleteAskins(id);
  }
}
