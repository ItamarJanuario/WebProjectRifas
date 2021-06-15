import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  belongsTo,
  BelongsTo,
  hasOne,
  HasOne,
} from '@ioc:Adonis/Lucid/Orm'
import Ruffle from './Ruffle'
import User from './User'
import Prize from './Prize'

export default class Ticket extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public ruffleId: number

  @column()
  public userId: number

  @column()
  public number: number

  @belongsTo(() => Ruffle)
  public ruffle: BelongsTo<typeof Ruffle>

  @belongsTo(() => User)
  public User: BelongsTo<typeof User>

  @hasOne(() => User)
  public userHasOne: HasOne<typeof User>

  @hasOne(() => Ruffle)
  public ruffleHasOne: HasOne<typeof Ruffle>

  @hasMany(() => Prize)
  public prizes: HasMany<typeof Prize>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
