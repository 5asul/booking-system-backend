import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

export const prismaMock = mockDeep<PrismaClient>();

jest.mock('../config/db', () => ({
  prisma: prismaMock,
}));

export type PrismaMock = DeepMockProxy<PrismaClient>;
