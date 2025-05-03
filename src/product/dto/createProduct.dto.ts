import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsBoolean,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;

  @IsString()
  imageUrl: string;

  @IsString()
  categoryId: string;

  @IsOptional()
  @IsString()
  newCollectionId?: string;

  @IsArray()
  @IsString({ each: true })
  colorIds: string[];

  @IsArray()
  @IsString({ each: true })
  sizeIds: string[];

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}
