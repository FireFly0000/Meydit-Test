import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Job extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type: String

  @column()
  public img_1: String

  @column()
  public img_2: String

  @column()
  public description: String

  @column()
  public budget: number

  @column()
  public user_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
