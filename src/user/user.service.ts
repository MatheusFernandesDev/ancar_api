import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import UserEntity from './interface/user.entity';
import { hash } from 'bcrypt';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(CreateUserDto: CreateUserDto): Promise<UserEntity> {
    const saltorRounds = 10;
    const passwordHash = await hash(CreateUserDto.password, saltorRounds);

    const newUser = this.userRepository.create({
      name: CreateUserDto.name,
      password: passwordHash,
      cpf: CreateUserDto.cpf,
    });

    return this.userRepository.save(newUser);
  }

  async getUsers(
    page: number = 1,
    limit: number = 10,
  ): Promise<Pagination<UserEntity>> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    queryBuilder.orderBy('user.id', 'ASC');

    return paginate<UserEntity>(queryBuilder, { page, limit });
  }

  async getUser(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    user.name = updateUserDto.name;
    user.cpf = updateUserDto.cpf;
    user.password = updateUserDto.password;

    return this.userRepository.save(user);
  }

  async updateUserPatch(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    await this.userRepository.update(id, updateUserDto);
    return this.getUser(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);

    return;
  }
}
