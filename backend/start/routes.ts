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
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy
    ? response.ok(report)
    : response.badRequest(report)
})

Route
  .resource('profiles', 'ProfilesController')
  .apiOnly()

Route
  .resource('jobs', 'JobsController')
  .apiOnly()

Route.post('login','AuthController.login')
Route.post('register','AuthController.register')
Route.post('reg_profile','ProfilesController.reg_profile')
Route.post('get_profile','ProfilesController.get_profile')
Route.post('edit_profile', 'ProfilesController.edit_profile')
Route.post('add_job', 'JobsController.add_job')
Route.post('get_customer_jobs', 'JobsController.get_customer_jobs')
Route.post('get_all_jobs', 'JobsController.get_all_jobs')
Route.post('delete_job', 'JobsController.delete_job')
Route.post('send_job_quotation', 'JobsController.send_job_quotation' )