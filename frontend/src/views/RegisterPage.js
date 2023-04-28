import { useState} from "react";
import { Dropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Register(props) {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [isMaker, setIsMaker] = useState(false);
  const [role, setRole] = useState("Customer");
  const navigate = useNavigate();

  const RouteChange = (np, newUserID)=> {
    let path = np;
    navigate(path, { state: { uid: newUserID} });
  }

  const toggleRole = (roleName) =>{
    if(roleName === "Maker"){
        setIsMaker(true)
    }
    else{
        setIsMaker(false)
    }
    setRole(roleName)
  }

  const handleSubmit = async e => {
    e.preventDefault();
    let formField = new FormData()

    formField.append('email', email)
    formField.append('password', password)
    formField.append('password2', password2)
    formField.append('is_maker', isMaker)

    await axios({
        method: 'post',
        url: 'http://127.0.0.1:3333/register',
        data: formField
    }).then(res =>{
      if(!res.data.validConfirmPassword){
        alert("Confirmed password does not match")
        return
      }
      if(!res.data.validEmail){
        alert("Invalid email")
        return
      }
      if(res.data.emailExist){
        alert("This email is already registered")
        return
      }
      RouteChange('/reg_profile', res.data.new_user_id)
    }).catch(err =>{
      console.log(err)   
    })
  };

  

  return (
    <section className="auth">
      <div className="Auth-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Register</h1>
          <label htmlFor="email">email</label>
          <input
            type="text"
            id="email"
            onChange={e => setEmail(e.target.value)}
            placeholder="email"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            onChange={e => setPassword2(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <label htmlFor="Register as">Register as</label>
          <div className="role-dropdown">
          <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                    {role}
                </Dropdown.Toggle>
        
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() =>toggleRole("Maker")}>Maker</Dropdown.Item>
                    <Dropdown.Item onClick={() =>toggleRole("Customer")}>Customer</Dropdown.Item>
                </Dropdown.Menu>
          </Dropdown>
          </div>
          <p>{password2 !== password ? "Passwords do not match" : ""}</p>
        <button className="auth-btn">Continue</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('login')}> Already have an account? login</button>
      </div>
    </section>
  );
}

export default Register;