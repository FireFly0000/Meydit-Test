import axios from "axios"
import { useNavigate } from "react-router-dom";

function JobCard(props){
    const navigate = useNavigate();

    const deleteJob= async () =>{
        let formField = new FormData()
    
        formField.append('jid', props.id)
    
        await axios({
            method: 'post',
            url: 'http://127.0.0.1:3333/delete_job',
            data: formField
        }).then(res =>{

        }).catch(err =>{
          console.log(err)   
        })
        props.changeFlag()
    }

    const viewJob= async () =>{
        navigate("/view_job", { state: { img1:props.img1, img2:props.img2, type:props.type, budget:props.budget, description:props.description } });
    }

    return(
        <div className="job-card">
            <h3>Type: {props.type}</h3>
            <h3>Budget: {props.budget}</h3>
            <button className="view-btn" onClick={viewJob}>View</button>
            <button className="delete-btn" onClick={deleteJob}>X</button>
        </div>
    )
}

export default JobCard
