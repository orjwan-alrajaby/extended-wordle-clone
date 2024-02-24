import { DataTypes, Model } from 'sequelize';
import sequelizeInstance from "../db/config";
import { Level as LevelInterface } from "../interfaces/Level.interface";

class LevelClass extends Model<LevelInterface> implements LevelInterface {
  public id: string = "";
  public level: string = "";
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const LevelModel = LevelClass.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  level: {
    type: DataTypes.STRING,
    unique: true
  },
}, {
  sequelize: sequelizeInstance,
  tableName: "Levels"
})

export default LevelModel;