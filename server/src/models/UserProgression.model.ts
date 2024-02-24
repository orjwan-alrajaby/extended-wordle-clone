import { DataTypes, Model } from 'sequelize';
import sequelizeInstance from "../db/config";
import { UserProgression as UserProgressionInterface } from "../interfaces/UserProgression.interface";

class UserProgressionClass extends Model<UserProgressionInterface> implements UserProgressionInterface {
  public id: string = "";
  public userId: string = "";
  public levelId: string = "";
  public themeId: string = "";
  public wordId: string = "";
  public attempts_count: number = 0;
  public hasGuessedWord: boolean = false;
  public timeToGuess!: Date;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const UserProgressionModel = UserProgressionClass.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4
  },
  levelId: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4
  },
  themeId: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4
  },
  wordId: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4
  },
  attempts_count: {
    type: DataTypes.INTEGER
  },
  hasGuessedWord: {
    type: DataTypes.BOOLEAN
  },
  timeToGuess: {
    type: DataTypes.DATE
  }
}, {
  sequelize: sequelizeInstance,
  tableName: "UserProgressions"
})

export default UserProgressionModel;