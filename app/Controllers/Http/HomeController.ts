import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ruffle from 'App/Models/Ruffle'
import Ticket from 'App/Models/Ticket'
import User from 'App/Models/User'

export default class HomeController {
  public async index({ view, auth }: HttpContextContract) {
    //
    if (auth.user!!) {
      const ruffles = await Ruffle.all()

      const RuffleUserIs = await Ruffle.query().whereHas('tickets', (query) => {
        query.where('user_id', auth.user!!.id)
      })

      const users = await User.query()
      const tickets = await Ticket.query()

      return view.render('home/index', { ruffles, RuffleUserIs, users, tickets })
    } else {
      const ruffles = await Ruffle.all()
      const users = await User.query()
      const tickets = await Ticket.query()

      return view.render('home/index', { ruffles, users, tickets })
    }
  }
}
