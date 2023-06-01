import { ApiProperty } from '@nestjs/swagger';

export class CreateAnswerDto {
  @ApiProperty({
    description: 'Descrição da resposta',
    example: 'Azul',
  })
  description: string;

  @ApiProperty({
    description: 'ID da pergunta relacionada',
    example: 1,
  })
  ask_id: number;
}
