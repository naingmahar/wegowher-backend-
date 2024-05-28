import { Column, Table, Model } from 'sequelize-typescript';

@Table({
  tableName: 'message',
  timestamps: true,
})
export class Message extends Model {

  @Column({primaryKey:true,autoIncrement:true})
  id:number

  @Column
  topic: string;

  @Column
  socketId: string;

  @Column
  message: string;

}