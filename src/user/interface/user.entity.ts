import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}

export default UserEntity;
