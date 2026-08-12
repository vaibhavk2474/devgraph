import type { Request, Response, NextFunction } from "express";

export function errorHandler(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    console.error('centralized error handler:', error);
    res.status(500).json({
        message: error.message || "Internal server error",
    });
}