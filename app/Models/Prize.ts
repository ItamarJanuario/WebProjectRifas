import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Ruffle from './Ruffle'
import Ticket from './Ticket'

export default class Prize extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public ruffleId: number

  @column()
  public ticketSort: number

  @column()
  public description: string

  @column()
  public placing: string

  @belongsTo(() => Ruffle)
  public ruffle: BelongsTo<typeof Ruffle>

  @belongsTo(() => Ticket)
  public ticket: BelongsTo<typeof Ticket>

  @hasOne(() => Ruffle)
  public ruffleHasOne: HasOne<typeof Ruffle>

  @hasOne(() => Ticket)
  public TicketHasOne: HasOne<typeof Ticket>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
