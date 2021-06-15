import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ruffle from 'App/Models/Ruffle'
import Ticket from 'App/Models/Ticket'
import User from 'App/Models/User'

export default class TicketsController {
  public async show({ params, view }: HttpContextContract) {
    const ruffle = await Ruffle.query().where('id', params.id).firstOrFail()
    const tickets = await ruffle.related('tickets').query()
    const users = await User.query()
    return view.render('tickets/show', { ruffle, tickets, users })
  }

  public async buy({ params, auth, response }: HttpContextContract) {
    await Ticket.query().where('id', params.ticketId).update({ user: auth.user?.id })
    return response.redirect().toRoute('ticket.show', { id: params.id })
  }
}
