import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthUserTokenDto {
  @ApiProperty({ required: true, example: '4LVmzSoEGl0v-EhiSWf920E-xQgLnJkCZB1Se5IKjRIXkIMTlEwYs7yJ1P0ZnTlP.DBhXpqu_kJ' })
  @IsNotEmpty()
  token: string;
}
