import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Prize from 'App/Models/Prize'
import Ruffle from 'App/Models/Ruffle'
import Type from 'App/Models/Type'
import ValidatorRuffles from 'App/Validators/ValidatorRuffles'

export default class RufflesController {
  public async create({ view }: HttpContextContract) {
    const ruffle = new Ruffle()
    const types = await Type.all()
    return view.render('ruffle/create', { ruffle, types })
  }

  public async store({ request, auth, response }: HttpContextContract) {
    const database = await request.only([
      'title',
      'description',
      'pobableDate',
      'initDate',
      'endDate',
      'sortDate',
      'valueTicket',
      'typeId',
    ])

    const dataPrize = await request.only(['prize'])

    console.log(database)

    await request.validate(ValidatorRuffles)
    const ruffle = await auth.user!!.related('ruffles').create(database)

    await ruffle.related('prizes').create({ description: dataPrize.prize, placing: '1' })

    let tickets: Array<Object> = []

    for (let i = 0; i < 1000; i++) {
      tickets.push({ number: i })
    }

    await ruffle.related('tickets').createMany(tickets)
    response.redirect().toRoute('/')
  }

  public async show({ view, auth }: HttpContextContract) {
    const ruffles = await auth.user!!.related('ruffles').query()
    return view.render('ruffle/show', { ruffles })
  }

  public async update({ request, response, session }: HttpContextContract) {
    await request.validate(ValidatorRuffles)

    session.flash('notice', '[ SUCESS ] Rifa atualizou com sucesso.')
    response.redirect().toRoute('raffle.show')
  }
}
