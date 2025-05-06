import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(data.password, salt);

    try {
      const existingUsers = await this.prisma.user.findFirst({
        //check if user already exists by email or username
        where: {
          OR: [{ email: data.email }, { username: data.username }],
        },
      });

      if (existingUsers) {
        return {
          message: 'User already exists',
          status: 403,
        };
      }

      return await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          username: true,
          role: true,
          phoneNumber: true,
          address: true,
          imageUrl: true,
          isVerified: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      throw new Error('User creation failed: ' + error.message);
    }
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
