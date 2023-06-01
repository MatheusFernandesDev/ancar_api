import { ApiProperty } from '@nestjs/swagger';

export class UpdateAskinDto {
  @ApiProperty({
    description: 'Nova descrição da pergunta',
    example: 'Qual é a sua cor favorita?',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Novo ID da pergunta relacionada',
    example: 1,
    required: false,
  })
  question_id?: number;
}
