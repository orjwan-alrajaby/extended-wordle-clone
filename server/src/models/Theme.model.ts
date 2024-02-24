import { DataTypes, Model } from 'sequelize';
import sequelizeInstance from "../db/config";
import { Theme as ThemeInterface } from "../interfaces/Theme.interface";

class ThemeClass extends Model<ThemeInterface> implements ThemeInterface {
  public id: string = "";
  public theme: string = "";
  public backgroundUrl: string = "";
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const ThemeModel = ThemeClass.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  theme: {
    type: DataTypes.STRING,
    unique: true
  },
  backgroundUrl: {
    type: DataTypes.STRING
  },
}, {
  sequelize: sequelizeInstance,
  tableName: "Themes"
})

export default ThemeModel;