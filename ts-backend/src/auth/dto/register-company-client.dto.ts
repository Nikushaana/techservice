import { Matches, MinLength, IsString, IsNotEmpty } from 'class-validator';

export class RegisterCompanyClientDto {
  @IsString()
  @Matches(/^5[0-9]{8}$/, {
    message: 'Phone number must start with 5 and be 9 digits long',
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  companyAgentName: string;

  @IsString()
  @IsNotEmpty()
  companyAgentLastName: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  companyIdentificationCode: string;

  @IsString()
  @MinLength(6)
  password: string;
}
