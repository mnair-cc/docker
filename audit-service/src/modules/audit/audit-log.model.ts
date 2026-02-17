import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class AuditLog extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  action: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  timestamp: Date;
}
