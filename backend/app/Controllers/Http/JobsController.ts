// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Job from "App/Models/Job";
import Application from '@ioc:Adonis/Core/Application'
import Mail from '@ioc:Adonis/Addons/Mail'
import User from "App/Models/User";

export default class JobsController {
    public async index () {
        const jobs = await Job.all()
        return jobs
    }

    public async show ({ params }) {
        const job = await Job.find(params.id)
        return job
    }

    public async add_job({request, response}){
        const job = new Job()
        const data = request.all()
        const img1 = request.file('img1')
        const img2 = request.file('img2')

        if (img1) {
            await img1.move(Application.tmpPath('images'))
        }
        if (img2) {
            await img2.move(Application.tmpPath('images'))
        }

        job.type = data.type
        job.img_1 = data.img_1
        job.img_2 = data.img_2
        job.description = data.description
        job.budget = data.budget
        job.user_id = data.user_id
 
        await job.save()
        response.header('Access-Control-Allow-Origin', '*')
    }

    public async get_customer_jobs({request, response}){
        const uid = request.all().uid

        const jobs = await Job.query()
        .where('user_id', uid)

        response.send({
            jobs: jobs
        })

        response.header('Access-Control-Allow-Origin', '*')
    }

    public async delete_job({request, response}){
        const job = await Job.find(request.all().jid)
        if (job) {
            job.delete()
        }
        else {
            response.send({
                'message': 'user Id Not Found'
            })
        }

        response.header('Access-Control-Allow-Origin', '*')
    }

    public async get_all_jobs({response}){
        const jobs = await Job.query()
        .select('*')

        response.send({
            jobs: jobs
        })

        response.header('Access-Control-Allow-Origin', '*')
    }

    public async send_job_quotation({request,response}){
        const uid = request.all().uid
        const content = request.all().message
        const quotation = request.all().quotation

        const customer = await User.query()
        .where('id', uid)
        .first()
        

        if(customer){
            await Mail.send((message) => {
                console.log(content)
                message
                .from('meydit@message.com')
                .to(customer.email)
                .subject('Your Job Just Received a new quotation')
                .htmlView('emails/quotation', {content, quotation})
            })
        }

        response.header('Access-Control-Allow-Origin', '*')
    }
}
