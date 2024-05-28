import { Column, Table, Model } from 'sequelize-typescript';

@Table({
  tableName: 'keygen',
  timestamps: true,
})
export class KeyGen extends Model {

  @Column({primaryKey:true,autoIncrement:true})
  id:number

  @Column
  socketId: string;

  @Column
  key: string;

}