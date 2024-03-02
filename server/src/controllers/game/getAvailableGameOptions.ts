import { Request, Response } from "express";
import httpStatusCodes from "../../constants/httpStatusCodes";
import UserProgressionModel from "../../models/UserProgression.model";
import sequelizeInstance from "../../db/config";
import ThemeModel from "../../models/Theme.model";

const getAvailableGameOptions = async (req: Request, res: Response) => {
   try {
      const userId = req.userId;

      const result = await UserProgressionModel.findAll({
        attributes: [
          [sequelizeInstance.literal('DISTINCT Themes.themeId'), 'themeId'],
          'theme'
         ],
         include: [{
          model: ThemeModel,
          required: false 
        }],

      })

      res.status(httpStatusCodes.HTTP_200_OK.code).json({ ...httpStatusCodes.HTTP_200_OK, result });
   } catch (error: any) {
      console.log("Error in getting available game 123456", error)
      res.status(httpStatusCodes.HTTP_500_INTERNAL_SERVER_ERROR.code).json({ ...httpStatusCodes.HTTP_500_INTERNAL_SERVER_ERROR, error });
   }
}

export default getAvailableGameOptions;