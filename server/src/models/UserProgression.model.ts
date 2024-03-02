import { DataTypes, Model } from 'sequelize';
import sequelizeInstance from "../db/config";
import { UserProgression as UserProgressionInterface } from "../interfaces/UserProgression.interface";
import ThemeModel from './Theme.model';

class UserProgressionClass extends Model<UserProgressionInterface> implements UserProgressionInterface {
  public id!: string;
  public userId!: string;
  public levelId!: string;
  public themeId!: string;
  public wordId!: string;
  public attempts_count!: number;
  public hasGuessedWord!: boolean;
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
    validate: {
      notEmpty: true
    }
  },
  levelId: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true
    }
  },
  themeId: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true
    }
  },
  wordId: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true
    }
  },
  attempts_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  hasGuessedWord: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  timeToGuess: {
    type: DataTypes.DATE
  },
  gameStatus: {
    type: DataTypes.STRING,
    defaultValue: "in_progress",
  },
  guesses: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  }
}, {
  sequelize: sequelizeInstance,
  tableName: "UserProgressions"
})

UserProgressionModel.hasMany(ThemeModel)

export default UserProgressionModel;