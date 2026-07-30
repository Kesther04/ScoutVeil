import type { NextFunction, Request, Response } from "express";

type AsyncRouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

/**
 * Express 4 doesn't forward rejected promises to error middleware on its own.
 * Wrap every async controller method with this so `throw new AppError(...)`
 * and rejected awaits land in errorMiddleware instead of hanging the request.
 */
export function asyncHandler(fn: AsyncRouteHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}

// export function asyncHandler(fn: AsyncRouteHandler) {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await fn(req, res, next);
//     } catch (error) {
//       next(error);
//     }
//   };
// }