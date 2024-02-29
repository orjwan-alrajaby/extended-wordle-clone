import { Request, Response, NextFunction } from "express"
import httpStatusCodes from "../constants/httpStatusCodes"
import jwt from 'jsonwebtoken';
import { AUTH_SECRET } from "../constants/env";


const verifyToken = ({ token, refresh = false }: {
  token: string;
  refresh?: boolean;
}) => {
  try {
    const decoded = jwt.verify(token, AUTH_SECRET as string) as { userId: string };

    const result: {
      decoded: { userId: string };
      accessToken?: string;
      refreshToken?: string;
    } = { decoded }

    if (refresh) {
      const accessToken = jwt.sign(decoded, AUTH_SECRET as string);
      result.accessToken = accessToken;
      const refreshToken = jwt.sign(decoded, AUTH_SECRET as string);
      result.refreshToken = refreshToken;
    }

    return result;
  } catch (error) {
    return null;
  }
};


const checkIfAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const refreshToken = req.headers["refresh-token"] as string;

    if (!authHeader) throw ("Authorization header is missing.");

    if (!AUTH_SECRET) throw ("Env variable AUTH_SECRET is undefined.");

    const accessToken = authHeader.split("Bearer ")[1];

    // if verifyToken returns null because accessToken isn't valid
    // refresh the token
    const result = verifyToken({ token: accessToken }) || verifyToken({ token: refreshToken, refresh: true });
    

    if (result?.decoded) {
      res.set('Access-Control-Expose-Headers', 'access-token, refresh-token');
      res.set('access-token', result?.accessToken);
      res.set('refresh-token', result?.refreshToken);
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