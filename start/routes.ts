/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

//grupo de rotas que apontam para o login.

Route.group(() => {
  Route.get('/', 'HomeController.index').as('root')
  //Criando rotas para registrar e armazenar rifas e também mostrar.
  Route.get('/registerRuffles', 'RufflesController.create').as('ruffle.create')
  Route.post('/registerRuffles', 'RufflesController.store').as('ruffle.store')
  Route.get('/showRuffles', 'RufflesController.show').as('ruffle.show')
  //Criando rotas para mostrar todos os tickets e compralos.
  Route.get('/showrRuffles/:id/tickets', 'TicketsController.show').as('ticket.show')
  Route.get('/showRuffles/:id/tickets/:ticketId/buy', 'TicketsController.buy').as('ticket.buy')

  Route.get('/registerTypes', 'TypesController.create').as('type.create')
  Route.post('/registerTypes', 'TypesController.create').as('type.store')

  Route.get('/ruffles/:ruffle_id/prizes/create', 'PrizesController.create').as('prize.create')

  Route.post('/ruffles/:ruffle_id/prizes', 'PrizesController.store').as('prize.store')
}).middleware('auth')

Route.get('/login', 'AuthController.login').as('auth.login')
Route.post('/login', 'AuthController.verify').as('auth.verify')
Route.get('/logout', 'AuthController.logout').as('auth.logout')
Route.get('/register', 'AuthController.register').as('auth.register')
Route.post('/register', 'AuthController.store').as('auth.store')