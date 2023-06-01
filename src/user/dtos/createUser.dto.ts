import QuestionEntity from 'src/question/interface/question.entity';

export interface CreateUserDto {
  name: string;
  password: string;
  cpf: string;
  questions?: QuestionEntity[];
}
