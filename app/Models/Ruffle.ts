import { DateTime } from 'luxon'
import {
  BaseModel,
  belongsTo,
  BelongsTo,
  column,
  hasMany,
  HasMany,
  hasOne,
  HasOne,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Type from './Type'
import Prize from './Prize'
import Ticket from './Ticket'

export default class Ruffle extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public typeId: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public pobableDate: DateTime

  @column()
  public initDate: DateTime

  @column()
  public endDate: DateTime

  @column()
  public sortDate: DateTime

  @column()
  public valueTicket: number

  @belongsTo(() => User)
  public userBelongsTo: BelongsTo<typeof User>

  @belongsTo(() => Type)
  public typeBelongsTo: BelongsTo<typeof Type>

  @hasOne(() => User)
  public users: HasOne<typeof User>

  @hasOne(() => Type)
  public types: HasOne<typeof Type>

  @hasMany(() => Prize)
  public prizes: HasMany<typeof Prize>

  @hasMany(() => Ticket)
  public tickets: HasMany<typeof Ticket>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
