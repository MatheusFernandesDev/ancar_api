import { ApiProperty } from '@nestjs/swagger';

export class CreateAskinDto {
  @ApiProperty({
    description: 'Descrição da pergunta',
    example: 'Qual é a sua cor favorita?',
  })
  description: string;

  @ApiProperty({
    description: 'ID do Questionario Relacionado',
    example: 1,
  })
  question_id: number;
}
