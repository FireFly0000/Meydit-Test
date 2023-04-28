// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from "App/Models/Profile";

export default class ProfilesController {
    public async index () {
        const profiles = await Profile.all()
        return profiles
    }

    public async show ({ params }) {
        const profile = await Profile.find(params.id)
        return profile
    }

    public async reg_profile({request, response}){
        const profile = new Profile()
        const data = request.all()

        profile.first_name = data.first_name
        profile.last_name = data.last_name
        profile.home_address = data.home_address
        profile.city = data.city
        profile.state = data.state
        profile.postcode = data.postcode
        profile.phone_number = data.phone_number
        profile.user_id = data.user_id

        await profile.save()
        response.header('Access-Control-Allow-Origin', '*')
    }

    public async edit_profile({request, response}){
        const data = request.all()
        
        const profile = await Profile.query()
        .where('user_id', data.user_id)
        .first()

        if(profile){
            profile.first_name = data.first_name
            profile.last_name = data.last_name
            profile.home_address = data.home_address
            profile.city = data.city
            profile.state = data.state
            profile.postcode = data.postcode
            profile.phone_number = data.phone_number
            
            await profile.save()
        }

        response.header('Access-Control-Allow-Origin', '*')
    }

    public async get_profile({request, response}){
        const uid = request.all().uid

        const profile = await Profile.query()
        .where('user_id', uid)
        .first()

        response.send({
            profile: profile
        })

        response.header('Access-Control-Allow-Origin', '*')
    }
}
