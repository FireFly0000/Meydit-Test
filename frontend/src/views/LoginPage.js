import React, {useState} from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const LoginPage = (props) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const RouteChange = async (np, uid, isMaker)=> {

    let formField = new FormData()

    formField.append('uid', uid)

    let profile = await axios({
        method: 'post',
        url: 'http://127.0.0.1:3333/get_profile',
        data: formField
    })

    let path = np;
    navigate(path, { state: { uid: uid, isMaker: isMaker, profile: profile.data.profile} });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    let formField = new FormData()

    formField.append('email', email)
    formField.append('password', password)

    await axios({
        method: 'post',
        url: 'http://127.0.0.1:3333/login',
        data: formField
    }).then(res =>{
        if(res.data.success){
            RouteChange('/home', res.data.id, res.data.is_maker)
        }
        else{
            alert("Invalid email or password")
        }

    }).catch(err =>{
      console.log(err)   
    })
  };

  return (
    <section className="auth">
      <div className="Auth-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login </h1>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" placeholder="Enter Email" onChange={e => setEmail(e.target.value)}/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)}/>
        <br></br>
        <button className="auth-btn" type="submit">Login</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('register')}> Don't have an account? Register</button>
      </div>
    </section>
  );
};

export default LoginPage;