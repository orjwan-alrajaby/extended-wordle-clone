import { Request, Response } from "express";
import UserModel from "../../models/User.model";
import httpStatusCodes from "../../constants/httpStatusCodes";
import { Op } from "sequelize";

const signup = (isAdmin: boolean) => async (req: Request, res: Response) => {
   try {
      const { username, email, password } = req.body;

      const userExists = await UserModel.findOne({
         where: {
            [Op.or]: {
               email: email || "",
               username: username || "",
            }
         }
      });

      if (userExists) {
         return res.status(httpStatusCodes.HTTP_409_CONFLICT.code).json(httpStatusCodes.HTTP_409_CONFLICT)
      } 

      const role = isAdmin ? "admin" : "player";

      const user = await UserModel.create({ username, email, password, role });

      return res.status(httpStatusCodes.HTTP_201_CREATED.code).json(httpStatusCodes.HTTP_201_CREATED)
   } catch (error: any) {
      return res.status(httpStatusCodes.HTTP_500_INTERNAL_SERVER_ERROR.code).json(httpStatusCodes.HTTP_500_INTERNAL_SERVER_ERROR)
   }
}

export default signup;