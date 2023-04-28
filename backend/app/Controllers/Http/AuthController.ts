// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User"
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController {
    public async login({ request, response}) {
        const email = request.all().email
        const password = request.all().password

        const user = await User.query()
        .where('email', email)
        .first()

        if(user != null){
            if (!(await Hash.verify(user.password, password))) {
                response.send({
                    success: false
                })
            }
            else{
                response.send({
                    success: true,
                    id: user.id,
                    is_maker: user.is_maker
                })
            }
        }
        else if( user == null){
            response.send({
                success: false
            })
        }

        response.header('Access-Control-Allow-Origin', '*')
    }

    public async register({ request, response }) {
        let validConfirmPassword = true
        let validEmail = false
        let emailExist = false
        let new_user_id = 0

        const data = request.all()

        const userExist = await User.query()
        .where('email', data.email)
        .first()

        if(data.password != data.password2){
            validConfirmPassword = false
        }
        if(userExist != null){
            emailExist = true
        }
        
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (data.email.match(validRegex)) {
            validEmail = true;
        }

        if(validConfirmPassword && validEmail && !emailExist){
            const user = new User()
            user.email = data.email
            user.password = data.password
            user.is_maker = data.is_maker
            await user.save()
            new_user_id = user.id
        }

        response.send({
            validConfirmPassword: validConfirmPassword,
            validEmail: validEmail,
            emailExist: emailExist,
            new_user_id: new_user_id    
        })
        response.header('Access-Control-Allow-Origin', '*')
    }
}


