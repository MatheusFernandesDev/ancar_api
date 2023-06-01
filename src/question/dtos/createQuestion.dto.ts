import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty({
    description: 'Nova data do questionário',
    example: '2023-06-01',
  })
  date: Date;

  @ApiProperty({
    description: 'Novo nome do questionário',
    example: 'Questionário de Satisfação',
  })
  name: string;

  @ApiProperty({
    description: 'Nova descrição do questionário',
    example:
      'Por favor, responda às seguintes perguntas para nos ajudar a melhorar nossos serviços.',
  })
  description: string;
}
