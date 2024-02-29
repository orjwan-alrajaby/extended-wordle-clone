import { Request, Response } from "express";
import UserModel from "../../models/User.model";
import httpStatusCodes from "../../constants/httpStatusCodes";
import { Op } from "sequelize";
import jwt from 'jsonwebtoken';
import { AUTH_SECRET } from "../../constants/env";

const login = async (req: Request, res: Response) => {
   try {
      const { username, email, password } = req.body;

      const user = await UserModel.findOne({
         where: {
            [Op.or]: {
               email: email || "",
               username: username || "",
            }
         }
      });

      if (!user) return res.status(httpStatusCodes.HTTP_401_UNAUTHORIZED.code).json(httpStatusCodes.HTTP_401_UNAUTHORIZED);

      const isMatch = await user.verifyPassword(password);

      if (!isMatch) return res.status(httpStatusCodes.HTTP_401_UNAUTHORIZED.code).json(httpStatusCodes.HTTP_401_UNAUTHORIZED)

      if (!AUTH_SECRET) return res.status(httpStatusCodes.HTTP_500_INTERNAL_SERVER_ERROR.code).json({...httpStatusCodes.HTTP_500_INTERNAL_SERVER_ERROR})

      const accessToken = jwt.sign({ userId: user.id }, AUTH_SECRET, { expiresIn: '6h' });
      
      const refreshToken = jwt.sign({ userId: user.id }, AUTH_SECRET, { expiresIn: '1d' });

      return res.status(httpStatusCodes.HTTP_200_OK.code).json({ ...httpStatusCodes.HTTP_200_OK, body: { accessToken, refreshToken } })
   } catch (error) {
      return res.status(httpStatusCodes.HTTP_500_INTERNAL_SERVER_ERROR.code).json({
         ...httpStatusCodes.HTTP_500_INTERNAL_SERVER_ERROR,
         error
      })
   }
}

export default login;