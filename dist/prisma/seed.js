"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const category = await prisma.category.create({
        data: {
            name: 'Clothing',
            description: 'All kinds of clothing items',
        },
    });
    const newCollection = await prisma.newCollection.create({
        data: {
            name: 'Spring 2025',
            description: 'Latest fashion trends for Spring 2025',
        },
    });
    const defaultMeta = {
        size: { name: 'M', symbol: 'M', fullName: 'Medium' },
        color: { name: 'Blue', imageUrl: 'https://example.com/floral-shirt.jpg' },
        quantity: 1,
        rating: 4.5,
        reviews: 24,
    };
    const product1 = await prisma.product.create({
        data: {
            name: 'Floral Shirt',
            description: `Light and breezy floral patterned shirt.
        Size: ${defaultMeta.size.fullName}
        Color: ${defaultMeta.color.name}
        Rating: ${defaultMeta.rating}
        Reviews: ${defaultMeta.reviews}`,
            price: 30000,
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
    const user = await prisma.user.create({
        data: {
            firstName: 'Jane',
            lastName: 'Smith',
            username: 'janesmith',
            email: 'jane@example.com',
            password: 'securehashedpassword',
            phoneNumber: '+1234567890',
            address: '456 Fashion Blvd',
            imageUrl: 'https://example.com/janesmith.jpg',
            isAdmin: false,
            isVerified: true,
            isActive: true,
        },
    });
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
//# sourceMappingURL=seed.js.map