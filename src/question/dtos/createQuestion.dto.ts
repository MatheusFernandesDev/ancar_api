import AskinsEntity from 'src/askins/interface/askins.entity';
import UserEntity from 'src/user/interface/user.entity';

export interface CreateQuestionDto {
  date: Date;
  name: string;
  description: string;
  user: UserEntity;
  askins: AskinsEntity[];
}
