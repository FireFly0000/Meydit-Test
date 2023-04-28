import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Profiles extends BaseSchema {
  protected tableName = 'profiles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.timestamps(true)
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('home_address').notNullable()
      table.string('city').notNullable()
      table.string('state').notNullable()
      table.string('postcode').notNullable()
      table.string('phone_number').notNullable()
      table
        .integer('user_id')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE') // delete profile when user is deleted
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
