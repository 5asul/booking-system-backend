import { Request, Response, NextFunction } from "express";

// Custom error interface
interface CustomError extends Error {
  status?: number;
}

// Global error handler
export function errorHandler(err: CustomError, req: Request, res: Response, next: NextFunction) {
  console.error("Error:", err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}
