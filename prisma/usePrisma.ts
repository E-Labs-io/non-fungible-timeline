/** @format */

import { PrismaClient } from "@prisma/client";

let usePrisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  usePrisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  usePrisma = global.prisma;
}

export default usePrisma;
