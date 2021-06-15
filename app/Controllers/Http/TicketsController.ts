import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ruffle from 'App/Models/Ruffle'
import Ticket from 'App/Models/Ticket'

export default class TicketsController {
  public async show({ params, view }: HttpContextContract) {
    const ruffle = await Ruffle.query().where('id', params.id).firstOrFail()
    const tickets = await ruffle.related('tickets').query()
    return view.render('ticket/show', { ruffle, tickets })
  }

  public async buy({ params, auth, response }: HttpContextContract) {
    await Ticket.query().where('id', params.ticketId).update({ user_id: auth.user?.id })
    console.log('amendoa')
    return response.redirect().toRoute('ticket.show', { id: params.id })
  }
}
