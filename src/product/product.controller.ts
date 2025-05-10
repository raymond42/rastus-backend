import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from '@prisma/client';
import { CreateProductDto } from './dto/createProduct.dto';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiBody,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@Controller('v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBearerAuth('access-token')
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'subImages', maxCount: 5 },
    ]),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        // file fields
        image: { type: 'string', format: 'binary', example: 'image.jpg' },
        subImages: {
          type: 'array',
          items: { type: 'string', format: 'binary', example: 'subImage.jpg' },
        },
        // other text fields from your DTO
        name: { type: 'string', example: 'Long T-shirts' },
        shortDescription: {
          type: 'string',
          example: 'Comfortable and stylish long t-shirts for everyday wear.',
        },
        longDescription: {
          type: 'string',
          example:
            'Soft, breathable, and sustainably made — your new favorite everyday item.',
        },
        price: { type: 'number', example: 99.99 },
        stock: { type: 'number', example: 100 },
        categoryId: { type: 'string', example: 'Product Category ID' },
        newCollectionId: { type: 'string', example: 'New Collection ID' },
        sizeIds: {
          type: 'array',
          items: { type: 'string' },
          example: ['sizeId1', 'sizeId2'],
        },
        isFeatured: { type: 'boolean', example: true },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles()
    files: { image?: Express.Multer.File[]; subImages?: Express.Multer.File[] },
  ) {
    return await this.productService.create(createProductDto, files);
  }

  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return await this.productService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.productService.delete(id);
  }
}
