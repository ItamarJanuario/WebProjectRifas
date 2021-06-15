import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Type from 'App/Models/Type'

export default class DatabaseSeeder extends BaseSeeder {
  public async run() {
    const type1 = await Type.create({
      description: 'amendoa de sal de arroz',
      initialNumber: 1,
      step: 3,
      ticketsQuant: 122,
    })
  }
}
