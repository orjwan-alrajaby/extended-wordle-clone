import { DataTypes, Model } from 'sequelize';
import sequelizeInstance from "../db/config";
import { Mode as ModeInterface } from "../interfaces/Mode.interface";

class ModeClass extends Model<ModeInterface> implements ModeInterface {
  public id: string = "";
  public mode: string = "";
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const ModeModel = ModeClass.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  mode: {
    type: DataTypes.STRING,
    unique: true
  },
}, {
  sequelize: sequelizeInstance,
  tableName: "Modes"
})

export default ModeModel;