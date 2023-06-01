import AskinsEntity from 'src/askins/interface/askins.entity';

export interface CreateAnswerDto {
  description: string;
  ask_id: number;
  askin: AskinsEntity;
}
