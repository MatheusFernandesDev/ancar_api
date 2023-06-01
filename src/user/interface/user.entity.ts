import QuestionEntity from '../../question/interface/question.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'user' })
class UserEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'cpf' })
  cpf: string;

  // @OneToMany(() => QuestionEntity, (question) => question.user)
  // questions: QuestionEntity[];
}

export default UserEntity;
