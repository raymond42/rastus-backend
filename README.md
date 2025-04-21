# 🛒 Rastus Backend API

This is the backend API for **Rastus**, a full-featured e-commerce platform. It manages users, products, categories, orders, carts, and new collections using **Node.js**, **Prisma**, and **PostgreSQL**.

---

## ⚙️ Tech Stack

- **NestJS** – Progressive Node.js framework for building efficient, reliable, and scalable server-side applications
- **Express** – Web framework used by NestJS
- **PostgreSQL** – Relational database
- **Prisma ORM** – Type-safe database client
- **TypeScript** – For type safety
- **JWT Authentication** – Secure authentication
- **Swagger** – API documentation

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/rastus-ecommerce-api.git
cd rastus-ecommerce-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a .env file in the root directory and add the following:

```bash
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/rastus_db
JWT_SECRET=your_jwt_secret
```

Replace <username> and <password> with your PostgreSQL credentials.

### 4. Setup the Database

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Seed the Database(Optional)

```bash
npx prisma db seed
```

Make sure your package.json has the Prisma seed config:

```json
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}
```

## 📄 API Documentation

Interactive API documentation is available via **Swagger**:

📍 [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

Swagger provides complete documentation for all endpoints, request/response formats, and authentication flows.

## 🔐 Authentication

- **JWT-based authentication**
- Login required for protected routes (e.g., orders, cart)
- Admin-only routes protected by middleware

---

## 📝 License

Licensed under the MIT License.

---

## 👨‍💻 Author

Made with ❤️ by **Your Name**

Contributions, issues, and feature requests are welcome!
