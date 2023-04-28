import { useState, useEffect} from "react";
import axios from "axios";
import './profileForm.css'
import { useNavigate } from "react-router-dom";

function CustomerPage(props){
    const [firstName, setFirstName] = useState(props.profile['first_name']);
    const [lastName, setLastName] = useState(props.profile['last_name']);
    const [homeAddress, setHomeAddress] = useState(props.profile['home_address']);
    const [city, setCity] = useState(props.profile['city']);
    const [Pstate, setPstate] = useState(props.profile['state']);
    const [postcode, setPostcode] = useState(props.profile['postcode']);
    const [phoneNumber, setPhoneNumber] = useState(props.profile['phone_number']);
    const navigate = useNavigate();

    useEffect(() => {
    
      }, [props.uid])

    const handleSubmit = async e => {
        e.preventDefault();
        let formField = new FormData()
    
        formField.append('first_name', firstName)
        formField.append('last_name', lastName)
        formField.append('home_address', homeAddress)
        formField.append('city', city)
        formField.append('state', Pstate)
        formField.append('postcode', postcode)
        formField.append('phone_number', phoneNumber)
        formField.append('user_id', props.uid)
    
        await axios({
            method: 'post',
            url: 'http://127.0.0.1:3333/edit_profile',
            data: formField
        }).then(res =>{

        }).catch(err =>{
          console.log(err)   
        })
        navigate('/customer_job')
    };

    const routeChange = async () =>{
        navigate('/customer_job', {state:{uid: props.uid}})
    }

    return(
    <section>  
        <div className="profile-form-container">
        <form className="profile-form" onSubmit={handleSubmit}>
          <h1>Profile </h1>
          <div className="profile-form-row">
            <div className="profile-item"> 
                <label htmlFor="first name">First name</label>
                <input type="text" id="first name" defaultValue={firstName} onChange={e => setFirstName(e.target.value)}/>
            </div>
            <div className="profile-item">   
                <label htmlFor="last name">Last name</label>
                <input type="text" id="last name" defaultValue={lastName} onChange={e => setLastName(e.target.value)}/>
            </div>
          </div>
          <div className="profile-form-row">
            <div className="profile-item"> 
                <label htmlFor="postcode">Address</label>
                <input type="text" id="address" defaultValue={homeAddress} onChange={e => setHomeAddress(e.target.value)}/>
            </div>
            <div className="profile-item">   
                <label htmlFor="city">City</label>
                <input type="text" id="city" defaultValue={city} onChange={e => setCity(e.target.value)}/>
            </div>    
          </div>
          <div className="profile-form-row">  
            <div className="profile-item"> 
                <label htmlFor="postcode">Postcode</label>
                <input type="text" id="postcode" defaultValue={postcode} onChange={e => setPostcode(e.target.value)}/>
            </div>
            <div className="profile-item">      
                <label htmlFor="state">State</label>
                <input type="text" id="state" defaultValue={Pstate} onChange={e => setPstate(e.target.value)}/>
            </div> 
          </div>
          <div className="profile-form-row">  
            <div className="profile-item"> 
                <label htmlFor="phone number">Phone Number</label>
                <input type="text" id="phone number" defaultValue={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
            </div>   
          </div>  
          <br></br>
          <button className="auth-btn" type="submit">Update Profile</button>
          <br></br>
          <button className="auth-btn" onClick={routeChange}> Your Jobs</button>
        </form>
        </div>
    </section>  
    )
}

export default CustomerPage