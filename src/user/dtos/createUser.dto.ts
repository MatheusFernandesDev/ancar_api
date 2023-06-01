import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'password123',
  })
  password: string;

  @ApiProperty({
    description: 'CPF do usuário',
    example: '123.456.789-00',
  })
  cpf: string;
}
