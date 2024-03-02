import { Request, Response } from "express";
import httpStatusCodes from "../../constants/httpStatusCodes";
import WordModel from "../../models/Word.model";
import UserProgressionModel from "../../models/UserProgression.model";
import { Op } from "sequelize";
import sequelizeInstance from "../../db/config";

const startGame = async (req: Request, res: Response) => {
   try {
      const userId = req.userId;

     const { levelId, themeId } = req.body;
     
     const wordsIds = await UserProgressionModel.findAll({
       attributes: ['wordId'],
       where: {
          userId,
        }
     })
           
      const randomWordObj = await WordModel.findOne({
         order: sequelizeInstance.random(),
         where: {
              themeId,
              levelId,
           id: { [Op.notIn]: wordsIds.map(ele => ele.wordId) },
         }
     });
      
      if (randomWordObj) {   
         const record = await UserProgressionModel.create({
            themeId,
            levelId,
            userId,
            wordId: randomWordObj.id,
            gameStatus: "in_progress"
         })
         return res.status(httpStatusCodes.HTTP_201_CREATED.code).json({...httpStatusCodes.HTTP_201_CREATED, wordsIds, randomWordObj });
      }

      return  res.status(httpStatusCodes.HTTP_409_CONFLICT.code).json({...httpStatusCodes.HTTP_409_CONFLICT, error: 'No more words available in this level or theme combination'});
   } catch (error: any) {
      res.status(httpStatusCodes.HTTP_500_INTERNAL_SERVER_ERROR.code).json({ ...httpStatusCodes.HTTP_500_INTERNAL_SERVER_ERROR, error });
   }
}

export default startGame;