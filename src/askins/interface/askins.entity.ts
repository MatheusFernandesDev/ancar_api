import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';

@Entity('askins')
class AskinsEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'question_id' })
  question_id: number;
}

export default AskinsEntity;
