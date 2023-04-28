import {useLocation} from 'react-router-dom';
import { useEffect } from "react"

function MakerViewJob(props){
    const location = useLocation();
    const state = location.state

    const homeAddress = state.profile['home_address'];
    const city = state.profile['city'];
    const Pstate = state.profile['state'];
    const postcode = state.profile['postcode'];    
    const phoneNumber = state.profile['phone_number'];
    const firstName = state.profile['first_name'];
    const lastName = state.profile['last_name'];

    useEffect(() => {
 
    }, [])

    return(
        <div className="job-card">
            <h3>Sample image 1's file name in backend local storage: {state.img1}</h3>
            <h3>Sample image 2's file name in backend local storage: {state.img2}</h3>
            <h3>type: {state.type}</h3>
            <h3>budget: {state.budget}</h3>
            <h3>Description: {state.description}</h3>
            
            <br></br>
            <h2>Customer's Information</h2>
            <h3>Name: {firstName} {lastName}</h3>
            <h3>{homeAddress} {city} {Pstate} {postcode}</h3>
            <h3>Phone number: {phoneNumber}</h3>
        </div>
    )
}

export default MakerViewJob
