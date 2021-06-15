import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Ruffle from './Ruffle'

export default class Type extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

  @column()
  public initialNumber: number

  @column()
  public step: number

  @column()
  public ticketsQuant: number

  @hasMany(() => Ruffle)
  public ruffles: HasMany<typeof Ruffle>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
