import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Ruffles extends BaseSchema {
  protected tableName = 'ruffles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('description')
      table.dateTime('pobable_date').notNullable()
      table.dateTime('init_date').notNullable()
      table.dateTime('end_date').notNullable()
      table.dateTime('sort_date')
      table.integer('value_ticket').notNullable()
      // pegando FOREIGN KEY

      table.integer('user_id').unsigned().notNullable().references('id').inTable('users')
      table.integer('type_id').unsigned().notNullable().references('id').inTable('types')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
