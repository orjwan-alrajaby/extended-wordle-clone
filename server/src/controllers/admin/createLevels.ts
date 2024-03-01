import { Request, Response } from "express";
import LevelModel from "../../models/Level.model";
import httpStatusCodes from "../../constants/httpStatusCodes";
import { Level as LevelInterface } from "../../interfaces/Level.interface";

const createLevels = async (req: Request, res: Response) => {
   try {
      const { levels }: { levels: LevelInterface[] } = req.body;

      const data = await LevelModel.bulkCreate(levels);

      res.status(httpStatusCodes.HTTP_201_CREATED.code).json({...httpStatusCodes.HTTP_201_CREATED, data });
   } catch (error: any) {
      res.status(httpStatusCodes.HTTP_500_INTERNAL_SERVER_ERROR.code).json({ ...httpStatusCodes.HTTP_500_INTERNAL_SERVER_ERROR, error });
   }
}

export default createLevels;