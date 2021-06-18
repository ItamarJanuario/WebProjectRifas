import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PrizesController {
  public async create({ view, auth, params, response }: HttpContextContract) {
    console.log(params)
    const ruffle = await auth
      .user!!.related('ruffles')
      .query()
      .where('id', params.ruffle_id)
      .preload('prizes')
      .first()

    if (!ruffle) {
      return response.redirect().back()
    }

    return view.render('prize/create', { ruffle })
  }

  public async store({ params, auth, response, request }: HttpContextContract) {
    const ruffle = await auth
      .user!!.related('ruffles')
      .query()
      .where('ruffles.id', params.ruffle_id)
      .first()

    if (!ruffle) {
      return response.redirect().back()
    }

    const placing =
      parseInt(
        (await ruffle.related('prizes').query().max('placing', 'placing').first())?.placing
      ) || 0
    await ruffle
      .related('prizes')
      .create({ description: request.input('description'), placing: (placing + 1).toString() }) // Remover toString()

    response.redirect().toRoute('/ruffles/:ruffle_id/prizes/create', { ruffle_id: ruffle.id })
  }
}
