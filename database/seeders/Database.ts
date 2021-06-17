import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Type from 'App/Models/Type'
import User from 'App/Models/User'

export default class DatabaseSeeder extends BaseSeeder {
  public async run() {
    const type1 = await Type.create({
      description: 'amendoa de sal de arroz',
      initialNumber: 1,
      step: 3,
      ticketsQuant: 122,
    })

    const userAdmin = await User.create({
      name: 'Admin',
      email: 'admin@bot.com',
      password: 'admin',
      admin: true,
    })
  }
}
