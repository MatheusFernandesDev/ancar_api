import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import AskinsEntity from 'src/askins/interface/askins.entity';

@Entity({ name: 'answer' })
class AnswerEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'ask_id' })
  ask_id: number;

  // @ManyToOne(() => AskinsEntity, (ask) => ask.answers)
  // answer: AskinsEntity;
}

export default AnswerEntity;
