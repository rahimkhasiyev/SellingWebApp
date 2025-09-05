import { PrismaClient } from '@prisma/client';
let prismaClient: PrismaClient;

// Optional: libSQL adapter for serverless (e.g., Vercel + Turso)
if (process.env.LIBSQL_URL) {
  // Dynamically import to avoid adding to serverless bundle unless used
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { createClient } = require('@libsql/client');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { PrismaLibSQL } = require('@prisma/adapter-libsql');
  const libsql = createClient({
    url: process.env.LIBSQL_URL,
    authToken: process.env.LIBSQL_AUTH_TOKEN,
  });
  const adapter = new PrismaLibSQL(libsql);
  prismaClient = new PrismaClient({ adapter, log: ['warn', 'error'] });
} else {
  prismaClient = new PrismaClient({ log: ['warn', 'error'] });
}

const globalForPrisma = global as unknown as { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma ?? prismaClient;
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

