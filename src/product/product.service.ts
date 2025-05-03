import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/createProduct.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductDto) {
    const { colorIds, sizeIds, ...rest } = data;

    return this.prisma.product.create({
      data: {
        ...rest,
        colors: {
          connect: colorIds.map((id) => ({ id })),
        },
        sizes: {
          connect: sizeIds.map((id) => ({ id })),
        },
      },
    });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        colors: true,
        sizes: true,
      },
    });
  }

  update(id: string, data: Prisma.ProductUpdateInput) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }
  delete(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
