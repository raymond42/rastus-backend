import { PrismaClient, Role } from '@prisma/client';
import { genSalt, hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Default image data (refined structure)
  const defaultImage = {
    name: 'floral-shirt.jpg',
    color: 'Blue',
    imageUrl: 'https://example.com/floral-shirt.jpg',
  };

  const defaultSubImages = [
    {
      name: 'floral-shirt-side.jpg',
      color: 'Blue',
      imageUrl: 'https://example.com/floral-shirt-side.jpg',
    },
    {
      name: 'floral-shirt-back.jpg',
      color: 'Blue',
      imageUrl: 'https://example.com/floral-shirt-back.jpg',
    },
  ];

  // Create Category
  const category = await prisma.category.create({
    data: {
      name: 'Clothing',
      description: 'Men and Women Clothing',
    },
  });

  // Create New Collection
  const newCollection = await prisma.newCollection.create({
    data: {
      name: 'Spring 2025',
      description: 'Latest spring collection.',
    },
  });

  // Create Sizes
  const [smallSize, mediumSize, largeSize, extraLargeSize] = await Promise.all([
    prisma.size.create({
      data: { name: 'Small', symbol: 'S', fullName: 'Small' },
    }),
    prisma.size.create({
      data: { name: 'Medium', symbol: 'M', fullName: 'Medium' },
    }),
    prisma.size.create({
      data: { name: 'Large', symbol: 'L', fullName: 'Large' },
    }),
    prisma.size.create({
      data: { name: 'Extra Large', symbol: 'XL', fullName: 'Extra Large' },
    }),
  ]);

  // Create Product 1
  const product1 = await prisma.product.create({
    data: {
      name: 'Floral Shirt',
      shortDescription: 'Stylish floral shirt for summer.',
      longDescription:
        'Light and breezy floral patterned shirt. Perfect for casual outings.',
      price: 30000,
      stock: 100,
      categoryId: category.id,
      newCollectionId: newCollection.id,
      image: [defaultImage],
      subImages: defaultSubImages,
      sizes: {
        connect: [
          { id: smallSize.id },
          { id: mediumSize.id },
          { id: largeSize.id },
          { id: extraLargeSize.id },
        ],
      },
    },
  });

  // Create Product 2
  const product2 = await prisma.product.create({
    data: {
      name: 'Denim Jacket',
      shortDescription: 'Classic denim with a modern cut.',
      longDescription:
        'A durable and timeless jacket. Great for layering in spring.',
      price: 50000,
      stock: 50,
      categoryId: category.id,
      newCollectionId: newCollection.id,
      image: [
        {
          name: 'denim-jacket.jpg',
          color: 'Dark Blue',
          imageUrl: 'https://example.com/denim-jacket.jpg',
        },
      ],
      subImages: [
        {
          name: 'denim-jacket-back.jpg',
          color: 'Dark Blue',
          imageUrl: 'https://example.com/denim-jacket-back.jpg',
        },
        {
          name: 'denim-jacket-side.jpg',
          color: 'Dark Blue',
          imageUrl: 'https://example.com/denim-jacket-side.jpg',
        },
      ],
      sizes: {
        connect: [
          { id: mediumSize.id },
          { id: largeSize.id },
          { id: extraLargeSize.id },
        ],
      },
    },
  });

  // Create User
  const salt = await genSalt(10);
  const hashedPassword = await hash('securehashedpassword', salt);

  const user = await prisma.user.create({
    data: {
      firstName: 'Jane',
      lastName: 'Smith',
      username: 'janesmith',
      email: 'jane@example.com',
      password: hashedPassword,
      phoneNumber: '+1234567890',
      address: '456 Fashion Blvd',
      imageUrl: 'https://example.com/janesmith.jpg',
      role: Role.CUSTOMER,
      isVerified: true,
      isActive: true,
    },
  });

  // Create Order
  await prisma.order.create({
    data: {
      userId: user.id,
      total: product1.price + product2.price,
      status: 'PROCESSING',
      products: {
        connect: [{ id: product1.id }, { id: product2.id }],
      },
    },
  });

  // Create Cart
  await prisma.cart.create({
    data: {
      userId: user.id,
      total: product1.price + product2.price,
      products: {
        connect: [{ id: product1.id }, { id: product2.id }],
      },
    },
  });

  console.log('🌱 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
  })
  .finally(() => prisma.$disconnect());
