import { DataTypes, Model } from 'sequelize';
import sequelizeInstance from "../db/config";
import { User as UserInterface } from "../interfaces/User.interface";
import bcrypt from "bcrypt";

export class UserClass extends Model<UserInterface> implements UserInterface {
  public id!: string;
  public username!: string;
  public email!: string;
  public password!: string;

  public verifyPassword(password: string) {
    return bcrypt.compare(password, this.password)
  }
  
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
  tableName: "Users",
  hooks: {
    beforeCreate(user) {
      const hash = bcrypt.hashSync(user.password, 10);
      user.password = hash;
    }
  }
})

export default UserModel