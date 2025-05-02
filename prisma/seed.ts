import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a Category
  const category = await prisma.category.create({
    data: {
      name: 'Clothing',
      description: 'All kinds of clothing items',
    },
  });

  // Create a NewCollection
  const newCollection = await prisma.newCollection.create({
    data: {
      name: 'Spring 2025',
      description: 'Latest fashion trends for Spring 2025',
    },
  });

  // Default meta info for frontend
  const defaultMeta = {
    size: { name: 'M', symbol: 'M', fullName: 'Medium' },
    color: { name: 'Blue', imageUrl: 'https://example.com/floral-shirt.jpg' },
    quantity: 1,
    rating: 4.5,
    reviews: 24,
  };

  // Create Products
  const product1 = await prisma.product.create({
    data: {
      name: 'Floral Shirt',
      description: `Light and breezy floral patterned shirt.
        Size: ${defaultMeta.size.fullName}
        Color: ${defaultMeta.color.name}
        Rating: ${defaultMeta.rating}
        Reviews: ${defaultMeta.reviews}`,
      price: 30000, // store price in FRW as number
      stock: 100,
      categoryId: category.id,
      newCollectionId: newCollection.id,
      imageUrl: defaultMeta.color.imageUrl,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Denim Jacket',
      description: `Classic denim with a modern cut.
        Size: ${defaultMeta.size.fullName}
        Color: ${defaultMeta.color.name}
        Rating: ${defaultMeta.rating}
        Reviews: ${defaultMeta.reviews}`,
      price: 50000,
      stock: 50,
      categoryId: category.id,
      newCollectionId: newCollection.id,
      imageUrl: 'https://example.com/denim-jacket.jpg',
    },
  });

  // Create a User
  const user = await prisma.user.create({
    data: {
      firstName: 'Jane',
      lastName: 'Smith',
      username: 'janesmith',
      email: 'jane@example.com',
      password: 'securehashedpassword', // hash in real apps
      phoneNumber: '+1234567890',
      address: '456 Fashion Blvd',
      imageUrl: 'https://example.com/janesmith.jpg',
      isAdmin: false,
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
