import { useState, useEffect } from "react"
import axios from "axios"
import MakerJobCard from "./MakerJobCard"

function MakerPage(){
    const [jobList, setJobList] = useState([])
    const [flag, setFlag] = useState(false)

    const changeFlag = () =>{
        setFlag(!flag)
    }

    useEffect(() => {
        const load_jobs = async ()=>{
            
            let jobs = await axios({
                method: 'post',
                url: 'http://127.0.0.1:3333/get_all_jobs',
            })

            await setJobList(jobs.data.jobs)
        }
        load_jobs()

    }, [flag])

    return(
        <div className="customer-job-page">
            <h3>All Jobs</h3>
            <div className="job-grid">
                {jobList?.map((job) =>{
                return( 
                    <MakerJobCard key={job.id} id={job.id} uid={job.user_id} type={job.type} budget={job.budget} description={job.description} img1={job.img_1} img2={job.img_2} changeFlag={changeFlag}/>
                )})}
            </div>
        </div>
    )
}

export default MakerPage
