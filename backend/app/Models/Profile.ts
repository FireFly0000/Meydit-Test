import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public first_name: String

  @column()
  public last_name: String

  @column()
  public home_address: String

  @column()
  public city: String

  @column()
  public state: String

  @column()
  public postcode: String

  @column()
  public phone_number: String

  @column()
  public user_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
