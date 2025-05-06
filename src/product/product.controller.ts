import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from '@prisma/client';
import { CreateProductDto } from './dto/createProduct.dto';
import { ApiBody, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  @ApiBody({ type: CreateProductDto })
  async create(@Body() data: CreateProductDto) {
    return await this.productService.create(data);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
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
