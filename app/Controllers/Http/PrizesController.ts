import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Prize from 'App/Models/Prize'
import ValidatorPrize from 'App/Validators/ValidatorPrize'

export default class PrizesController {
  public async create({ view }: HttpContextContract) {
    const prize = new Prize()

    return view.render('prize/create', { prize })
  }

  public async store({ params, auth, response, request }: HttpContextContract) {
    const database = await request.only(['description', 'placing'])

    await request.validate(ValidatorPrize)
  }
}
