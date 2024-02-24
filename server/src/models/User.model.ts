import { DataTypes, Model } from 'sequelize';
import sequelizeInstance from "../db/config";
import { User as UserInterface } from "../interfaces/User.interface";

class UserClass extends Model<UserInterface> implements UserInterface {
  public id: string = "";
  public username: string = "";
  public email: string = "";
  public password: string = "";
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const UserModel = UserClass.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  }, 
  username: {
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    type: DataTypes.STRING
  }
}, {
  sequelize: sequelizeInstance,
  tableName: "users"
})

export default UserModel;