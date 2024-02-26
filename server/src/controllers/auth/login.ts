import { Request, Response } from "express";
import UserModel from "../../models/User.model";
import httpStatusCodes from "../../constants/httpStatusCodes";
import { Op } from "sequelize";

const login = async (req: Request, res: Response) => {
   try {
      const { username, email, password } = req.body;

      const user = await UserModel.findOne({
         where: {
            [Op.or]: [{ email }, { username }],
         }
      });

      if (!user) {
         return res.status(httpStatusCodes.HTTP_401_UNAUTHORIZED.code).json(httpStatusCodes.HTTP_401_UNAUTHORIZED)
      }

      const isMatch = await user.verifyPassword(password);

      if (isMatch) {
         res.status(httpStatusCodes.HTTP_200_OK.code).json(httpStatusCodes.HTTP_200_OK)
      } else {
         return res.status(httpStatusCodes.HTTP_401_UNAUTHORIZED.code).json(httpStatusCodes.HTTP_401_UNAUTHORIZED)
      }
   } catch (error) {
      res.status(httpStatusCodes.HTTP_500_INTERNAL_SERVER_ERROR.code).json(httpStatusCodes.HTTP_500_INTERNAL_SERVER_ERROR)
   }
}

export default login;