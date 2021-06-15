import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Prizes extends BaseSchema {
  protected tableName = 'prizes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('description').notNullable()
      table.string('placing').notNullable()
      table.integer('sort')
      table.integer('ruffle').unsigned().notNullable().references('id').inTable('ruffles')
      table.integer('ticket_sort').unsigned().references('id').inTable('tickets')

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
