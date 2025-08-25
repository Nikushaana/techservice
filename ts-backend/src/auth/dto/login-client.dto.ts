import { IsString, Matches } from 'class-validator';

export class LoginClientDto {
  @IsString()
  @Matches(/^5[0-9]{8}$/, {
    message: 'Phone number must start with 5 and be 9 digits long',
  })
  phone: string;

  @IsString()
  password: string;
}
