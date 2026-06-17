import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

// Fungsi untuk membuat instance Prisma Client menggunakan adapter Neon
const prismaClientSingleton = () => {
  // Langsung masukkan objek connectionString ke PrismaNeon tanpa Pool manual
  // Ini menghindari error type mismatch antara driver serverless dengan adapter Prisma
  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
  return new PrismaClient({ adapter });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;