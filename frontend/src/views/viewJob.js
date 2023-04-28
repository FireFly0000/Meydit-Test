import {useLocation} from 'react-router-dom';

function ViewJob(props){
    const location = useLocation();
    const state = location.state

    return(
        <div className="job-card">
            <h3>Sample image 1's file name in backend local storage: {state.img1}</h3>
            <h3>Sample image 2's file name in backend local storage: {state.img2}</h3>
            <h3>type: {state.type}</h3>
            <h3>budget: {state.budget}</h3>
            <h3>Description: {state.description}</h3>
        </div>
    )
}

export default ViewJob
