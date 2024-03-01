import { Request, Response } from "express";
import WordModel from "../../models/Word.model";
import httpStatusCodes from "../../constants/httpStatusCodes";
import { Word as WordInterface } from "../../interfaces/Word.interface";

const createWords = async (req: Request, res: Response) => {
   try {
      const { words }: { words: WordInterface[] } = req.body;

      const data = await WordModel.bulkCreate(words);

      res.status(httpStatusCodes.HTTP_201_CREATED.code).json({...httpStatusCodes.HTTP_201_CREATED, data });
   } catch (error: any) {
      res.status(httpStatusCodes.HTTP_500_INTERNAL_SERVER_ERROR.code).json({ ...httpStatusCodes.HTTP_500_INTERNAL_SERVER_ERROR, error });
   }
}

export default createWords;