import { Matches, MinLength, IsString } from 'class-validator';

export class RegisterIndividualClientDto {
  @IsString()
  @Matches(/^5[0-9]{8}$/, {
    message: 'Phone number must start with 5 and be 9 digits long',
  })
  phone: string;

  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  @MinLength(6)
  password: string;
}
