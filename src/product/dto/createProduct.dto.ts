import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({ example: 'Long T-shirts' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Comfortable and stylish long t-shirts for everyday wear.',
  })
  @IsString()
  shortDescription: string;

  @ApiProperty({
    example:
      'Soft, breathable, and sustainably made — your new favorite everyday item.',
  })
  @IsString()
  longDescription: string;

  @ApiProperty({ example: 99.99 })
  @Type(() => Number) // ✅ convert from string
  @IsNumber()
  price: number;

  @ApiProperty({ example: 100 })
  @Type(() => Number) // ✅ convert from string
  @IsNumber()
  stock: number;

  @ApiProperty({ example: 'Product Category ID' })
  @IsString()
  categoryId: string;

  @ApiProperty({ example: 'New Collection ID', required: false })
  @IsOptional()
  @IsString()
  newCollectionId?: string;

  @ApiProperty({ example: ['sizeId1', 'sizeId2'] })
  @Type(() => String) // ✅ convert each item
  @IsArray()
  @IsString({ each: true })
  sizes: string[];

  @ApiProperty({ example: true })
  @IsOptional()
  @Type(() => Boolean) // ✅ convert from string
  @IsBoolean()
  isFeatured?: boolean;
}
