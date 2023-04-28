import axios from "axios"
import { useNavigate } from "react-router-dom";
import React from "react"
import SendQuotationModal from "../components/sendQuotationModal";

function MakerJobCard(props){
    const navigate = useNavigate();

    const viewJob= async () =>{
        let formField = new FormData()

        formField.append('uid', props.uid)
    
        let profile = await axios({
            method: 'post',
            url: 'http://127.0.0.1:3333/get_profile',
            data: formField
        })
    
        navigate("/maker_view_job", { state: { img1:props.img1, img2:props.img2, type:props.type, budget:props.budget, description:props.description, profile:profile.data.profile } });
    }

    return(
        <div className="job-card">
            <h3>Type: {props.type}</h3>
            <h3>Budget: {props.budget}</h3>
            <button className="view-btn" onClick={viewJob}>View</button>
            <SendQuotationModal uid={props.uid}/>
        </div>
    )
}

export default MakerJobCard
