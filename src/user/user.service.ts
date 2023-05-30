import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import UserEntity from './interface/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(CreateUserDto: CreateUserDto): Promise<UserEntity> {
    const saltorRounds = 10;
    const passwordHash = await hash(CreateUserDto.password, saltorRounds);

    return {
      ...CreateUserDto,
      id: 1,
    };
  }
}
