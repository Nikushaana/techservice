import { Matches, MinLength, IsString } from 'class-validator';

export class RegisterCompanyClientDto {
  @IsString()
  @Matches(/^5[0-9]{8}$/, {
    message: 'Phone number must start with 5 and be 9 digits long',
  })
  phone: string;

  @IsString()
  companyAgentName: string;

  @IsString()
  companyAgentLastName: string;

  @IsString()
  companyName: string;

  @IsString()
  companyIdentificationCode: string;

  @IsString()
  @MinLength(6)
  password: string;
}
