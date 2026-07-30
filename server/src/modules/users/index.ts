// export { default as authRouter } from "./auth.routes";
// // export { requireAuth, requireRole } from "./jwt.strategy";
// // export type { JwtPayload, SafeUser, AuthResponse } from "./user.types";
// // export { UserRole } from "./user.types";


// import { PrismaClient } from "@prisma/client";

// /**
//  * You likely already have this per your structure — only drop this in if
//  * shared/database/index.ts doesn't exist yet. Standard singleton pattern to
//  * avoid exhausting DB connections from hot-reload in dev.
//  */
// declare global {
//   // eslint-disable-next-line no-var
//   var __prisma: PrismaClient | undefined;
// }

// export const prisma = global.__prisma ?? new PrismaClient();

// if (process.env.NODE_ENV !== "production") {
//   global.__prisma = prisma;
// }

// server/src/modules/users/index.ts
export { authRoutes as authRouter } from "./auth.routes";