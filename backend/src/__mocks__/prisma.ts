import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
import { PrismaClient } from "@prisma/client";

jest.mock("../config/db", () => ({
  prisma: mockDeep<PrismaClient>(),
}));

import { prisma } from "../config/db";

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock: DeepMockProxy<PrismaClient> = prisma as any;
