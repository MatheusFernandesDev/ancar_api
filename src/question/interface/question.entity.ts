import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'question' })
class QuestionEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'date' })
  date: Date;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description' })
  description: string;
}

export default QuestionEntity;
