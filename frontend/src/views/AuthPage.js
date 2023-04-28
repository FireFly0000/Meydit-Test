import React, {useState} from "react";
import LoginPage from "./LoginPage";
import Register from "./RegisterPage";
import './Auth.css'

function Auth(){
    const [Form, setForm] = useState("login");
    const toggleForm = (formName) =>{
        setForm(formName)
    }

    return(
        <div className="auth">
            {Form === 'login' ? <LoginPage onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm}/>}
        </div>
    )
}

export default Auth