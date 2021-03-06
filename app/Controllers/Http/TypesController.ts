import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Type from 'App/Models/Type'

export default class TypesController {
  public async create({ view, auth, response }: HttpContextContract) {
    const type = new Type()

    // eslint-disable-next-line no-array-constructor
    if (!auth.user?.admin) {
      response.redirect().toRoute('root')
    }
    return view.render('type/create', { type })
  }

  public async store({ request, response }: HttpContextContract) {
    const database = await request.only(['description', 'initialNumber', 'step', 'ticketsQuant'])
    const type = await Type.create(database)
    response.redirect().toRoute('ruffle.show', { type })
  }
}
