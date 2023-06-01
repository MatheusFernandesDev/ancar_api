import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Novo nome do usuário',
    example: 'John Doe',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Novo CPF do usuário',
    example: '123.456.789-00',
    required: false,
  })
  cpf?: string;

  @ApiProperty({
    description: 'Nova senha do usuário',
    example: 'password123',
    required: false,
  })
  password?: string;
}
