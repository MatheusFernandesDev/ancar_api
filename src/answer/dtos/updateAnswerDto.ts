import { ApiProperty } from '@nestjs/swagger';

export class UpdateAnswerDto {
  @ApiProperty({
    description: 'Nova descrição da resposta',
    example: 'Verde',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Novo ID da pergunta relacionada',
    example: 1,
    required: false,
  })
  ask_id?: number;
}
