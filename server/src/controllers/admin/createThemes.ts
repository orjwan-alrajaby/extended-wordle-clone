import { Request, Response } from "express";
import ThemeModel from "../../models/Theme.model";
import httpStatusCodes from "../../constants/httpStatusCodes";
import { Theme as ThemeInterface } from "../../interfaces/Theme.interface";

const createThemes = async (req: Request, res: Response) => {
  try {
    const { themes }: { themes: ThemeInterface[] } = req.body;

    const data = await ThemeModel.bulkCreate(themes);

    res
      .status(httpStatusCodes.HTTP_201_CREATED.code)
      .json({ ...httpStatusCodes.HTTP_201_CREATED, data });
  } catch (error: any) {
    res
      .status(httpStatusCodes.HTTP_500_INTERNAL_SERVER_ERROR.code)
      .json({ ...httpStatusCodes.HTTP_500_INTERNAL_SERVER_ERROR, error });
  }
};

export default createThemes;
