import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ruffle from 'App/Models/Ruffle'
import Ticket from 'App/Models/Ticket'

const LIMIT = 100

export default class TicketsController {
  public async show({ params, view, request }: HttpContextContract) {
    const page = request.input('page', 1)
    const ruffle = await Ruffle.query().where('id', params.id).firstOrFail()
    const tickets = await ruffle
      .related('tickets')
      .query()
      .paginate(page > 0 ? page : 1, LIMIT)
    return view.render('ticket/show', { ruffle, tickets: tickets.toJSON() })
  }

  public async buy({ params, auth, response }: HttpContextContract) {
    await Ticket.query().where('id', params.ticketId).update({ user_id: auth.user?.id })
    console.log('amendoa')
    return response.redirect().toRoute('ticket.show', { id: params.id })
  }
}
