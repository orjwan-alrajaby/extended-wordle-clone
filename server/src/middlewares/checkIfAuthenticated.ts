import { Request, Response, NextFunction } from "express"
import httpStatusCodes from "../constants/httpStatusCodes"
import verifyToken from "../utils/verifyToken";

const checkIfAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const refreshToken = req.headers["refresh-token"] as string;

    if (!authHeader) throw ("Authorization header is missing.");

    const accessToken = authHeader.split("Bearer ")[1];

    // if verifyToken returns null because accessToken isn't valid
    // refresh the token
    const result = verifyToken({ token: accessToken }) || verifyToken({ token: refreshToken, refresh: true });
    
    if (result?.decoded) {
      res.set('Access-Control-Expose-Headers', 'access-token, refresh-token');
      res.set('access-token', result?.accessToken);
      res.set('refresh-token', result?.refreshToken);
      req.userId = result?.decoded?.userId;
      return next();
    }

    throw ("Invalid token");
  } catch (error: any) {
    return res
      .status(httpStatusCodes.HTTP_403_FORBIDDEN.code)
      .json({ ...httpStatusCodes.HTTP_403_FORBIDDEN, error });
  }
};


export default checkIfAuthenticated;