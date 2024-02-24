import { DataTypes, Model } from 'sequelize';
import sequelizeInstance from "../db/config";
import { Word as WordInterface } from "../interfaces/Word.interface";

class WordClass extends Model<WordInterface> implements WordInterface {
  public id: string = "";
  public word: string = "";
  public length: number = 0;
  public themeId: string = "";
  public levelId: string = "";
  public isPlayed: boolean = false;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const WordModel = WordClass.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  word: {
    type: DataTypes.STRING,
    unique: true
  },
  length: {
    type: DataTypes.INTEGER
  },
  themeId: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4
  },
  levelId: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4
  },
  isPlayed: {
    type: DataTypes.BOOLEAN
  }
}, {
  sequelize: sequelizeInstance,
  tableName: "Words"
})

export default WordModel;