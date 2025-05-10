import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'All Clothing' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'A collection of all clothing items available in the store.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
