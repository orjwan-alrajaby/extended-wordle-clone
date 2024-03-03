import { DataTypes, Model } from "sequelize";
import sequelizeInstance from "../db/config";
import { Word as WordInterface } from "../interfaces/Word.interface";
import ThemeModel from "./Theme.model";
import LevelModel from "./Level.model";

class WordClass extends Model<WordInterface> implements WordInterface {
  public id!: string;
  public word!: string;
  public length!: number;
  public meaning!: string;
  public themeId!: string;
  public levelId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const WordModel = WordClass.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    word: {
      type: DataTypes.STRING,
      unique: true,
    },
    length: {
      type: DataTypes.INTEGER,
    },
    meaning: {
      type: DataTypes.STRING,
    },
    themeId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUID,
      references: {
        model: ThemeModel,
        key: "id",
      },
    },
    levelId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUID,
      references: {
        model: LevelModel,
        key: "id",
      },
    },
  },
  {
    sequelize: sequelizeInstance,
    tableName: "Words",
  }
);

export default WordModel;
