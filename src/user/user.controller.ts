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
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/updateUser.dto';
import UserEntity from './interface/user.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async createUser(@Body() createUser: CreateUserDto) {
    return this.userService.createUser(createUser);
  }

  @Get()
  async getUsers(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<Pagination<UserEntity>> {
    return this.userService.getUsers(page, limit);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const userId = parseInt(id);

    return this.userService.getUser(userId);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updatateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.userService.updateUser(+id, updatateUserDto);
  }

  @Patch(':id')
  async updateUserPatch(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const userId = parseInt(id);
    return this.userService.updateUserPatch(userId, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.userService.deleteUser(+id);
  }
}
