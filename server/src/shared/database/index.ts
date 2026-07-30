// import { PrismaClient } from '@prisma/client'; // adjust to your actual output path
// import { PrismaNeon } from '@prisma/adapter-neon';

// const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
// export const prisma = new PrismaClient({ adapter });

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });

declare global {
  var __prisma: PrismaClient | undefined;
}

export const prisma = global.__prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  global.__prisma = prisma;
}