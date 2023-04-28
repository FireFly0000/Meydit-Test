import React from 'react';
import {useLocation} from 'react-router-dom';
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import './profileForm.css'

function RegProfile() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [homeAddress, setHomeAddress] = useState("");
    const [city, setCity] = useState("");
    const [Pstate, setPstate] = useState("");
    const [postcode, setPostcode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const navigate = useNavigate();

    const RouteChange = (np)=> {
      let path = np;
      navigate(path);
    }

    const location = useLocation();
    const state = location.state

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
        formField.append('user_id', state.uid)
    
        await axios({
            method: 'post',
            url: 'http://127.0.0.1:3333/reg_profile',
            data: formField
        }).then(res =>{
          RouteChange('/')
        }).catch(err =>{
          console.log(err)   
        })
      };
    return (
    <div className='auth'>       
    <div className="profile-form-container">
      <form className="profile-form" onSubmit={handleSubmit}>
      <h1>Register Your Profile </h1>
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
      <button className="auth-btn" type="submit">Submit</button>
    </form>
    </div>
    </div>   
    )
}

export default RegProfile