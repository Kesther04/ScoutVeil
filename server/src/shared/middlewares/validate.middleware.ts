import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";
import { AppError } from "../utils/appError";

/**
 * Validates req.body against a Zod schema. On failure, throws an AppError
 * with a `fieldErrors` map shaped as { [field]: message } — matches
 * AuthFieldErrors on the frontend so form fields can highlight individually.
 */
export function validate(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path.join(".") || "form";
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      return next(new AppError("Please fix the highlighted fields.", 422, fieldErrors));
    }

    req.body = result.data;
    next();
  };
}