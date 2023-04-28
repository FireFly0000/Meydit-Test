import { useState, useEffect } from "react"
import {useLocation} from 'react-router-dom'
import axios from "axios";
import './customerJobsPage.css'
import { Dropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import JobCard from "../components/jobCard";
import './jobCard.css'
function CustomerJobsPage(){
    const location = useLocation();
    const state = location.state

    const [jobList, setJobList] = useState([])
    const [flag, setFlag] = useState(false)
    const [img1, setImg1] = useState(null)
    const [img2, setImg2] = useState(null)
    const [imgURL1, setImgURL1] = useState("")
    const [imgURL2, setImgURL2] = useState("")
    const [type, setType] = useState("Dress")
    const [description, setDescription] = useState("")
    const [budget, setBudget] = useState(0)

    const toggleType = (TypeName) =>{
        setType(TypeName)
    }
    const ImgSelectHandler1 = async e =>{
        if(e.target.files && e.target.files.length > 0){
            setImg1(e.target.files[0]);
        }
    }

    const ImgSelectHandler2 = e =>{
        if(e.target.files && e.target.files.length > 0){
            setImg2(e.target.files[0]);
        }
    }

    const ImgUploadHandler = () =>{
        if(img1 === null || img2 === null){
            alert("Please upload 2 sample images")
            return
        }
        //setImgURL1(URL.createObjectURL(img1))
        //setImgURL2(URL.createObjectURL(img2))
        setImgURL1(img1.name)
        setImgURL2(img2.name)
    }

    const handleSubmit = async e => {
        e.preventDefault();
        let formField = new FormData()
    
        formField.append('img_1', imgURL1)
        formField.append('img_2', imgURL2)
        formField.append('type', type)
        formField.append('budget', budget)
        formField.append('description', description)
        formField.append('user_id', state.uid)
        formField.append('img1', img1)
        formField.append('img2', img2)

        await axios({
            method: 'post',
            url: 'http://127.0.0.1:3333/add_job',
            data: formField
        }).then(res =>{

        }).catch(err =>{
          console.log(err)   
        })
        changeFlag()

        await setImg1(null)
        await setImg2(null)
        await setType("Dress")
        await setBudget(0)
        await setDescription("")
    };
    
    const changeFlag = () =>{
        setFlag(!flag)
    }
    
    useEffect(() => {
        const load_jobs = async ()=>{
            
            let formField = new FormData()

            formField.append('uid', state.uid)

            let jobs = await axios({
                method: 'post',
                url: 'http://127.0.0.1:3333/get_customer_jobs',
                data: formField
            })

            await setJobList(jobs.data.jobs)
            console.log(flag)
        }
        load_jobs()
  
      }, [flag, state.uid])

    return(
        <div className="customer-job-page">
            <h2>Post New Job</h2>
            <div className="add-jobs-container">
                <form className="add-job-form" onSubmit={handleSubmit}>
                    <div className="add-job-form-row">
                        <div className="add-job-item">
                            <label htmlFor="img1">Sample Image 1</label> 
                            <input type="file" accept="image/*" id="img1" onChange={ImgSelectHandler1} defaultValue={img1} />
                        </div>
                        <div className="add-job-item">
                            <label htmlFor="img2">Sample Image 2</label> 
                            <input type="file" accept="image/*" id = "img2" onChange={ImgSelectHandler2} defaultValue={img2}/>
                        </div>
                        <div className="add-job-item">
                            <button type="button" onClick={ImgUploadHandler} className="job-btn">Upload Images</button>
                        </div>
                    </div>
                    <div className="add-job-form-row">
                        <div className="add-job-item">
                            <label className="job-form-label"> Select Type</label>
                            <div className="type-dropdown">
                                <Dropdown>
                                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                                        {type}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() =>toggleType("Dress")}>Dress</Dropdown.Item>
                                        <Dropdown.Item onClick={() =>toggleType("Ethnic Wear")}>Ethnic Wear</Dropdown.Item>
                                        <Dropdown.Item onClick={() =>toggleType("Sari / Blouse")}>Sari / Blouse</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="add-job-item">
                            <label className="job-form-label"> Budget</label> 
                            <input  type="number" id = "budget" onChange={e => setBudget(e.target.value)} defaultValue={budget}/>
                        </div>
                    </div>
                    <div className="add-job-form-row">
                        <div className="add-job-item">
                            <label className="job-form-label"> Description</label> 
                            <textarea maxLength={200} type="text" className="description-box" id = "description" onChange={e => setDescription(e.target.value)} defaultValue={description}/>
                        </div>
                        <div className="add-job-item">
                            <button className="job-btn" type="submit">Submit</button>
                        </div>
                    </div>
                </form> 
            </div>
            <br></br>
            <div className="job-grid">
                {jobList?.map((job) =>{
                return( 
                    <JobCard key={job.id} id={job.id} type={job.type} budget={job.budget} description={job.description} img1={job.img_1} img2={job.img_2} changeFlag={changeFlag}/>
                )})}
            </div>
        </div>
    )
}

export default CustomerJobsPage
