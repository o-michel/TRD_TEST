import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import cookies from 'js-cookie';
import axios, { AxiosError } from 'axios';
// import { BASEURL } from "../App";

import { AuthContext, hard } from "../App";

const TwoFAForm = (props) => {

    const [ otp , setOtp ] = useState('')

    const navigate = useNavigate();
    const location = useLocation();

    console.log(otp);

    const { authenticatedUser, handleAuth } = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const temp = cookies.get('temp');
        console.log(temp, '2FA')
        // const searchParams = new URLSearchParams(window.location.search);
        const searchParams = new URLSearchParams(location.search);
        const email = searchParams.get('email');
        axios({
            method: 'post',
            // url: `${BASEURL}/Signin`,
            url: 'http://localhost:5001/api/verify',
            data: {otp},
            params: {email} ,
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${'token'}`
                Authorization: `Bearer ${temp}`
            }
            // withCredentials: true
        })
        .then(res => {
            console.log(res.data);
            alert(res.data.msg)
            
            cookies.remove('temp')
            cookies.set('token', res.data.newAccessToken );
            // props.handleAlert(true, 'successfully Loged In!!!', 'success');

            // handleAuth()
            // navigate('/dashboard')
            // window.location.href = '/dashboard'

            if(res.data.user.userType === 'admin') {
                navigate('/admin/dashboard')
            } else if(res.data.user.userType === 'instructor') {
                navigate('/instructor/dashboard')
            } else if(res.data.user.userType === 'student') {
                navigate('/student/dashboard');
            } else {
                // navigate('/courses/allExams')
                window.location.back()
            }
        })
        .catch(err => {
            console.log(err)
            if(err && err instanceof AxiosError) {
                alert(err.message)
            } else if(err && err instanceof Error) {
                alert(err.response?.data.message);
            } else {
                alert('Error')
            }
            // props.handleAlert(false, e.response.data ? e.response.data : e.message, 'danger');
        });
    }

    return(
        // <div className="form">
        //     <div>Verify</div>

        //     <form onSubmit={handleSubmit}>
        //         <input type='text' name='otp' placeholder="OTP" onChange={(event) => setOtp(event.target.value)} value={otp} />

        //         <button type='submit'>Submit</button>
        //     </form>
        // </div>


        // new
        <div className="h-screen flex flex-col">
        <div className="flex-1 flex justify-center items-center">
          <div className="mx-5 my-1 sm:mx-7 md:m-10 md:max-w-md  w-full p-10 bg-white border border-slate-200 rounded-lg shadow">
            <div className="text-xl mb-8 font-semibold text-blue-600 text-center dark:text-white lg:justify-center">
              Enter OTP 
            </div>
  
            {/* TODO: fix form focus */}
  
            <form className=""  onSubmit={handleSubmit}>
  
              {/* OTP INPUT AREA */}
              <div className="form-control">
                {/* <label className="text-xs font-semibold text-slate-800">
                  Phone Number
                </label> */}
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                  placeholder="OTP"
                  type="number"
                  name="otp"
                  onChange={(event) => setOtp(event.target.value)}
                  value={otp}
                />
              </div>
              
              <button
                type="submit"
                class="w-full text-white bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center mt-8"
              >
                Verify
              </button>
            </form>
          </div>
        </div>
      </div>

    )
}

export default TwoFAForm;