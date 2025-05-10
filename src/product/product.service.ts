import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { v4 as uuid } from 'uuid';
import { Prisma } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import toStream from 'buffer-to-stream';
import { stat } from 'fs';

// Use the correct Cloudinary response type
interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
}

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  // Upload a file to Cloudinary
  async uploadToCloudinary(
    file: Express.Multer.File,
  ): Promise<{ name: string; color: string; imageUrl: string }> {
    const publicId = `products/${uuid()}`;
    const result: CloudinaryUploadResponse = await new Promise(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { public_id: publicId, folder: 'products' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CloudinaryUploadResponse); // Cast the result to CloudinaryUploadResponse
          },
        );
        toStream(file.buffer).pipe(uploadStream);
      },
    );

    return {
      name: file.originalname,
      color: 'Default Color',
      imageUrl: result.secure_url,
    };
  }

  async create(
    data: CreateProductDto,
    files: { image?: Express.Multer.File[]; subImages?: Express.Multer.File[] },
  ) {
    const uploadedImage =
      files.image && files.image[0]
        ? await this.uploadToCloudinary(files.image[0])
        : null;

    const uploadedSubImages = files.subImages
      ? await Promise.all(
          files.subImages.map((file) => this.uploadToCloudinary(file)),
        )
      : [];

    return this.prisma.product.create({
      data: {
        ...data,
        image: uploadedImage ? [uploadedImage] : [],
        subImages: uploadedSubImages,
        sizes: {
          connect: data.sizes?.map((id) => ({ id })) || [],
        },
      },
    });
  }

  async findAll() {
    const [products, count] = await Promise.all([
      this.prisma.product.findMany({
        include: { sizes: true },
      }),
      this.prisma.product.count(),
    ]);
    return {
      status: 200,
      count,
      products,
    };
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { sizes: true },
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
