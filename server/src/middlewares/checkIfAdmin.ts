import { Request, Response, NextFunction } from "express"
import httpStatusCodes from "../constants/httpStatusCodes"
import verifyToken from "../utils/verifyToken";
import UserModel from "../models/User.model";

const checkIfAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) throw ("Authorization header is missing.");

    const accessToken = authHeader.split("Bearer ")[1];

    const result  = verifyToken({ token: accessToken })
    
    if (result?.decoded?.userId) {
      const user = await UserModel.findOne({
         where: {
          id: result?.decoded?.userId
         }
      });

      if (user?.role === "admin") {
        return next();
      }
      throw ('User does not have the necessary permissions to complete this operation.')
    }

    throw ("Invalid token");
  } catch (error: any) {
    return res
      .status(httpStatusCodes.HTTP_403_FORBIDDEN.code)
      .json({ ...httpStatusCodes.HTTP_403_FORBIDDEN, error });
  }
};


export default checkIfAdmin;