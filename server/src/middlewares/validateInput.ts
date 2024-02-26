import { Request, Response, NextFunction } from "express"
import { AnyZodObject, ZodAny, ZodUnion } from "zod"
import httpStatusCodes from "../constants/httpStatusCodes"

const validateInput = (schema: AnyZodObject | ZodUnion<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      return next();
    } catch (error) {
      res.status(httpStatusCodes.HTTP_422_UNPROCESSABLE_CONTENT.code).json(httpStatusCodes.HTTP_422_UNPROCESSABLE_CONTENT)
    }
  }
}

export default validateInput;