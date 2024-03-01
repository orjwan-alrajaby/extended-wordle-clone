import jwt from 'jsonwebtoken';
import { AUTH_SECRET } from "../constants/env";

const verifyToken = ({ token, refresh = false }: {
  token: string;
  refresh?: boolean;
}) => {
  try {
    if (!AUTH_SECRET) throw ("Env variable AUTH_SECRET is undefined.");

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

export default verifyToken;