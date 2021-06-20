import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Prize from 'App/Models/Prize'
import Ruffle from 'App/Models/Ruffle'
import Ticket from 'App/Models/Ticket'
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

  public async sort({ view, params, response, session, auth }: HttpContextContract) {
    const ruffle = await auth
      .user!!.related('ruffles')
      .query()
      .where('ruffles.id', params.ruffle_id)
      .firstOrFail()

    const type = await Type.find(ruffle.typeId)

    let notSort = true

    const prizes = await Prize.query().where('ruffle_id', params.ruffle_id)

    let maxPrizes = 0
    let contPrizes = 1
    let ruffleBuy = false

    for (const prize of prizes) {
      maxPrizes++
    }
    do {
      do {
        const numberSort = Math.floor(Math.random() * (1000 - 1) + 1)
        //54
        const ticket = await Ticket.query()
          .where('tickets.ruffle_id', ruffle.id)
          .where('id', numberSort)
          .firstOrFail()

        if (ticket.userId) {
          await Prize.query()
            .where('ruffle_id', ruffle.id)
            .where('placing', contPrizes)
            .update({ ticket_id: ticket.id })
          contPrizes++
          ruffleBuy = true
        } else {
          ruffleBuy = false
        }
      } while (!ruffleBuy)
      console.log(contPrizes)

      if (contPrizes > maxPrizes) {
        notSort = false
      }
    } while (notSort)

    const prizeWinner = await ruffle
      .related('prizes')
      .query()
      .preload('TicketHasOne', (ticketQuery) => {
        ticketQuery.preload('User')
      })
    return view.render('ruffle/sort', { ruffle_id: params.ruffle_id, prizeWinner })
  }
}
