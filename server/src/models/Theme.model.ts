import { DataTypes, Model } from "sequelize";
import sequelizeInstance from "../db/config";
import { Theme as ThemeInterface } from "../interfaces/Theme.interface";

class ThemeClass extends Model<ThemeInterface> implements ThemeInterface {
  public id!: string;
  public theme!: string;
  public backgroundUrl!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const ThemeModel = ThemeClass.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      validate: {
        isUUID: 4,
      },
    },
    theme: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true,
        len: [2, 20],
      },
    },
    backgroundUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
        notEmpty: true,
      },
    },
  },
  {
    sequelize: sequelizeInstance,
    tableName: "Themes",
  }
);

export default ThemeModel;
