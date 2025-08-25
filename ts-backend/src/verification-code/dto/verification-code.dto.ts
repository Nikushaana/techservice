import { Matches, Length, IsString, MinLength } from 'class-validator';

export class PhoneDto {
  @IsString()
  @Matches(/^5[0-9]{8}$/, {
    message: 'Phone number must start with 5 and be 9 digits long',
  })
  phone: string;
}

export class VerifyCodeDto {
  @IsString()
  @Length(4, 4)
  code: string;

  @IsString()
  @Matches(/^5[0-9]{8}$/, {
    message: 'Phone number must start with 5 and be 9 digits long',
  })
  phone: string;
}

export class ResetPasswordDto {
  @IsString()
  @Length(4, 4)
  code: string;

  @IsString()
  @Matches(/^5[0-9]{8}$/, {
    message: 'Phone number must start with 5 and be 9 digits long',
  })
  phone: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class ChangeNumberDto {
  @IsString()
  @Length(4, 4)
  code: string;

  @IsString()
  @Matches(/^5[0-9]{8}$/, {
    message: 'Phone number must start with 5 and be 9 digits long',
  })
  newPhone: string;
}
