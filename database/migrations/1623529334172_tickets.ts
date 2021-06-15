import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tickets extends BaseSchema {
  protected tableName = 'tickets'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('number').notNullable()

      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('ruffle_id').unsigned().notNullable().references('id').inTable('ruffles')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
