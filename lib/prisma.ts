import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

// Fungsi singleton menggunakan konstruktor langsung bawaan Prisma v7
const prismaClientSingleton = () => {
  // Langsung masukkan objek connectionString tanpa Pool manual.
  // Ini adalah standar resmi Prisma v7 untuk menghindari bug instansiasi pooler di Turbopack
  const adapter = new PrismaNeon({ 
    connectionString: process.env.DATABASE_URL 
  });
  
  return new PrismaClient({ adapter });
};

declare global {
  // Menggunakan 'var' agar variabel ini menempel di global scope Node.js selama development
  var prisma: ReturnType<typeof prismaClientSingleton> | undefined;
}

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;