import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { IUser } from './users.interfaces';

@Table
export class User extends Model<IUser> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role: string;
}
