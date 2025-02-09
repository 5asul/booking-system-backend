"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = global.prisma || new client_1.PrismaClient();
if (process.env.NODE_ENV !== 'production')
    global.prisma = prisma;
// Add connection verification
prisma.$connect()
    .then(() => console.log('Database connected'))
    .catch((err) => console.error('Connection error:', err));
exports.default = prisma;
