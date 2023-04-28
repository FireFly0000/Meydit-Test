import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Jobs extends BaseSchema {
  protected tableName = 'jobs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamps(true)
      table.string('type').notNullable()
      table.string('img1').notNullable()
      table.string('img2').notNullable()
      table.string('description').notNullable()
      table.integer('budget').notNullable
      table
        .integer('user_id')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE') 
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
