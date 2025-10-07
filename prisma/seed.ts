// prisma/seed.ts
import { PrismaClient } from "../src/generated/prisma/index.js";
const prisma = new PrismaClient();
import bcrypt from "bcryptjs";

async function main() {
  // Hashing password dengan bcryptjs
  const hashedPassword = await bcrypt.hash("password123", 10); // '10' adalah salt rounds

  // Data user yang akan di-seed
  const userData = [
    {
      email: "admin@gmail.com",
      name: "admin123",
      // Simpan password yang sudah di-hash
      password: hashedPassword,
    },
  ];

  // Tambahkan data user ke database
  await prisma.user.createMany({
    data: userData,
    skipDuplicates: true,
  });
}

main()
  .then(() => {
    console.log("Seeding selesai ✅");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
