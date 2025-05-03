import { PrismaClient, Role } from '@prisma/client';
import { genSalt, hash } from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  // Default meta info for frontend
  const defaultMeta = {
    size: { name: 'M', symbol: 'M', fullName: 'Medium' },
    color: { name: 'Blue', imageUrl: 'https://example.com/floral-shirt.jpg' },
    quantity: 1,
    rating: 4.5,
    reviews: 24,
  };

  // Create Categories and New Collection (assuming they exist in your schema)
  const category = await prisma.category.create({
    data: {
      name: 'Clothing',
      description: 'Men and Women Clothing',
    },
  });

  const newCollection = await prisma.newCollection.create({
    data: {
      name: 'Spring 2025',
      description: 'Latest spring collection.',
    },
  });

  // Create Colors
  const blueColor = await prisma.color.create({
    data: {
      name: 'Blue',
      imageUrl: 'https://example.com/blue-color.jpg',
    },
  });

  const redColor = await prisma.color.create({
    data: {
      name: 'Red',
      imageUrl: 'https://example.com/red-color.jpg',
    },
  });

  const greenColor = await prisma.color.create({
    data: {
      name: 'Green',
      imageUrl: 'https://example.com/green-color.jpg',
    },
  });
  const blackColor = await prisma.color.create({
    data: {
      name: 'Black',
      imageUrl: 'https://example.com/black-color.jpg',
    },
  });

  const yellowColor = await prisma.color.create({
    data: {
      name: 'Yellow',
      imageUrl: 'https://example.com/yellow-color.jpg',
    },
  });

  const whiteColor = await prisma.color.create({
    data: {
      name: 'White',
      imageUrl: 'https://example.com/white-color.jpg',
    },
  });

  const purpleColor = await prisma.color.create({
    data: {
      name: 'Purple',
      imageUrl: 'https://example.com/purple-color.jpg',
    },
  });

  const orangeColor = await prisma.color.create({
    data: {
      name: 'Orange',
      imageUrl: 'https://example.com/orange-color.jpg',
    },
  });

  // Create Sizes
  const smallSize = await prisma.size.create({
    data: {
      name: 'Small',
      symbol: 'S',
      fullName: 'Small',
    },
  });

  const mediumSize = await prisma.size.create({
    data: {
      name: 'Medium',
      symbol: 'M',
      fullName: 'Medium',
    },
  });

  const largeSize = await prisma.size.create({
    data: {
      name: 'Large',
      symbol: 'L',
      fullName: 'Large',
    },
  });
  const extraLargeSize = await prisma.size.create({
    data: {
      name: 'Extra Large',
      symbol: 'XL',
      fullName: 'Extra Large',
    },
  });

  // Create Products
  const product1 = await prisma.product.create({
    data: {
      name: 'Floral Shirt',
      description: `Light and breezy floral patterned shirt. Size: ${defaultMeta.size.fullName} Color: ${defaultMeta.color.name} Rating: ${defaultMeta.rating} Reviews: ${defaultMeta.reviews}`,
      price: 30000, // store price in FRW as number
      stock: 100,
      categoryId: category.id,
      newCollectionId: newCollection.id,
      imageUrl: defaultMeta.color.imageUrl,
      colors: {
        connect: [
          { id: blueColor.id },
          { id: redColor.id },
          { id: orangeColor.id },
          { id: greenColor.id },
          { id: blackColor.id },
          { id: yellowColor.id },
          { id: whiteColor.id },
          { id: purpleColor.id },
        ],
      },
      sizes: {
        connect: [
          { id: mediumSize.id },
          { id: largeSize.id },
          { id: extraLargeSize.id },
          { id: smallSize.id },
        ],
      },
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Denim Jacket',
      description: `Classic denim with a modern cut. Size: ${defaultMeta.size.fullName} Color: ${defaultMeta.color.name} Rating: ${defaultMeta.rating} Reviews: ${defaultMeta.reviews}`,
      price: 50000,
      stock: 50,
      categoryId: category.id,
      newCollectionId: newCollection.id,
      imageUrl: 'https://example.com/denim-jacket.jpg',
      colors: {
        connect: [
          { id: blueColor.id },
          { id: blackColor.id },
          { id: whiteColor.id },
          { id: redColor.id },
        ],
      },
      sizes: {
        connect: [
          { id: largeSize.id },
          { id: smallSize.id },
          { id: extraLargeSize.id },
        ],
      },
    },
  });

  // Create a User
  const salt = await genSalt(10);
  const hashedPassword = await hash('securehashedpassword', salt);

  const user = await prisma.user.create({
    data: {
      firstName: 'Jane',
      lastName: 'Smith',
      username: 'janesmith',
      email: 'jane@example.com',
      password: hashedPassword, // hash in real apps
      phoneNumber: '+1234567890',
      address: '456 Fashion Blvd',
      imageUrl: 'https://example.com/janesmith.jpg',
      role: Role.CUSTOMER,
      isVerified: true,
      isActive: true,
    },
  });

  // Create an Order with Products
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

  // Create a Cart with Products
  await prisma.cart.create({
    data: {
      userId: user.id,
      total: product1.price + product2.price,
      products: {
        connect: [{ id: product1.id }, { id: product2.id }],
      },
    },
  });
}

main()
  .then(() => {
    console.log('🌱 Seeding complete!');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    return prisma.$disconnect();
  });
