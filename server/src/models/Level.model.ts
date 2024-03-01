import { DataTypes, Model } from 'sequelize';
import sequelizeInstance from "../db/config";
import { Level as LevelInterface } from "../interfaces/Level.interface";

class LevelClass extends Model<LevelInterface> implements LevelInterface {
  public id!: string;
  public level!: string;
  public description!: string;
  public wordLength!: number;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const LevelModel = LevelClass.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
  },
  level: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  wordLength: {
    type: DataTypes.INTEGER,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
}, {
  sequelize: sequelizeInstance,
  tableName: "Levels"
})

export default LevelModel;