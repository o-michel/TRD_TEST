import { useRef, useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";

import {Card, Button} from 'react-bootstrap';
import axios from 'axios';

import img from '../image/trd_img.png'

import TableList from '../component/TableList';

const CourseDetails = () => {
    const { id } = useParams();

    const [courseDetails, setCourseDetails]  = useState({
        details: {},
        instructors: []
    });
    const ref = useRef(true)

    useEffect(() => {
        if (ref.current) {
            axios({
                method: 'get',
                url: `http://localhost:5001/api/course/${id}`,
                // url: `${BASEURL}/examiner/exam`,
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: `Bearer ${'token'}`
                }
            })
            .then(res => {
                setCourseDetails(prev => ({
                    ...prev,
                    details: res.data.course,
                    instructors: res.data.course.instructors
                }))
            })
            .catch(e => {
                console.log(e)
                // handleAlert(true, e.response.data ? e.response.data : e.message, 'danger');
            });
        }

      return () => ref.current = false;
    })
console.log(courseDetails.details.name)
    return (
        <div>
            <img src={img}/>

            <div>
                <h1>{courseDetails.details.name}</h1>
                <p>{courseDetails.details.description}</p>
                <h4>Date and Time</h4>
                <p>Start Date: Fri, Jun 16, 2023, 9:00 AM</p>
                <p>End Date: Sat, Jun 17, 2023, 4:00 PM WAT</p>
                <p>Duration: 1 month</p>
                <p>Location: University of Ibadan</p>
                <p>payment: It's free for everyone</p>
                <p>Capacity: 1000</p>
                <p>Status: Upcoming</p>


                
                {/* {!registered ? <Button variant='primary' onClick={() => handleRegister()} >Register</Button> : <TableList />} */}
                <Button variant='primary' onClick={'() => handleRegister()'} style={{float: 'right'}} >Register</Button>
                {courseDetails.instructors && <TableList list={courseDetails.instructors} />}

            </div>
        </div>
    )
    
}

export default CourseDetails;