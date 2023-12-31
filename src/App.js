import { createContext, useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, Outlet, RouterProvider } from 'react-router-dom';
import cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import Courses from './pages/courses';
// import { loadCourses } from './pages/courses';
// import CourseDetails from './pages/courseDetails';
// import StudentDashboard, { loadMyCourses } from './pages/student/dashboard';
// import StudentRoutes from './pages/student/StudentRoutes';
import Navbarr from './component/header/navbar';
import SignUp from './pages/auth/signUp';
import SignIn from './pages/auth/signIn';
// import OtpForm from './pages/auth/otp';
// import OtpForm from './forms/auth/OTP';
import TwoFA from './pages/auth/twoFA';
// import InstructorDashboard from './pages/instructor/dashboard';
// import ViewAssignedCourseStudent from './pages/instructor/viewAssignedCourseStudent';
// import AdminMainBody from './pages/admin/AdminMainBody';
// import AdminNavigation from './pages/admin/AdminNavigation';
// import MetricCard from './pages/admin/MetricCard';
// import Instructors from './pages/admin/instructors';
// import Students from './pages/admin/students';
// import ViewStudent from './pages/admin/viewStudent';
// import AllCourses from './pages/admin/courses';
import Landing from './pages/landing';
import Footer from './component/footer';
import "./App.css";
import Contact from './pages/contact';
import AboutPage from './pages/about';
import Events from './pages/events';
import StudentDashboard from './pages/dashboard/student';
import AdminDashboard from './pages/dashboard/admin';
import StudentDetail from './pages/detail/student';
// import Home from './components/home';

import InstructorDashboard from './pages/AdminDashboard';

import AssignedCourses from './pages/AssignCourse';
import StudentTakingCourse from './pages/StudentTakingCourse';
import CompletedCourses from './pages/CompletedCourse';



export const AuthContext = createContext();

// export const BASEURL = 'http://localhost:5001/api';
export const BASEURL = 'https://trd-server.onrender.com/api'

function App() {

  const [authenticatedUser, setAuthenticatedUser] = useState({
    authenticated: false,
    firstName: '',
    lastName: '',
    courses: [],
    role: '',
    token: ''
  })

  const handleAuth = () => {
    const token = cookies.get('token')
    if (token) {
      const decoded = jwtDecode(token);
      console.log(decoded)
      setAuthenticatedUser(prev => ({
        authenticated: true,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        // courses: decoded.courses
        role: decoded.role,
        token
      }))
    }
  }

  // const [alert, setAlert] = useState({
  //   show: false,
  //   msg: '',
  //   type: ''
  // }) 

  // const handleAlert = (show, msg, type) => {
  //   setAlert({
  //       show,
  //       msg,
  //       type
  //   })
  // }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route >
        <Route path='/' element={<Root />}>
          <Route path='/' element={<Landing />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/events' element={<Events />} />
          <Route path='/courses' element={<Courses />} 
          // loader={loadCourses} 
          />
          {/* <Route path='/course/:id' element={<CourseDetails />} /> */}
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          {/* <Route path='/otpForm' element={<OtpForm />} /> */}
          <Route path='/verify' element={<TwoFA />} />
          {/* <Route element={<StudentRoutes />}> */}
            {/* <Route path='/dashboard/student' element={<StudentDashboard />} /> */}
            <Route path='/student/:id' element={<StudentDetail />} />
            {/* <Route path='/student/dashboard' element={<StudentDashboard />} loader={loadMyCourses} /> */}
          {/* </Route> */}
          <Route path='/admin/instructorDashboard/*' element={<InstructorDashboard />}>
          {/* <Route path='listOfUsers' element={<ListOfUsers />} /> */}
            <Route path='assignedCourses' element={<AssignedCourses />} />
            <Route path='studentTakingCourse' element={<StudentTakingCourse />} />
            <Route path='completedCourses' element={<CompletedCourses />} />
            
            {/* <Route path='/dashboard/instructor' element={<AdminDashboard />} /> */}
            {/* <Route path='/instructor/dashboard' element={<InstructorDashboard />} />
            <Route path='/instructor/course/:id' element={<ViewAssignedCourseStudent />} /> */}
          </Route>
          <Route >
            {/* <Route path='/admin/dashboard' element={<AdminMainBody />} />
            <Route path='/admin/instructors' element={<Instructors />} />
            <Route path='/admin/students' element={<Students />} /> */}
            {/* <Route path='/instructor/:id' element={<ViewStudent />} /> */}
            {/* <Route path='/student/:id' element={<ViewStudent />} />
            <Route path='/admin/courses' element={<AllCourses />} /> */}
            {/* <Route path='/admin/users' element={<AdminMainBody />} /> */}
            {/* <Route path='/admin/navigation' element={<AdminNavigation />} />
            <Route path='/admin/metric' element={<MetricCard />} /> */}
          </Route>
        </Route>
      </Route>
    )
  )

  return (
    <AuthContext.Provider value={{ authenticatedUser, handleAuth }}>
      {/* <> */}
      {/* <Navbarr /> */}

      {/* <div>Temp</div> */}
      <RouterProvider router={router} />
      {/* </> */}
    </AuthContext.Provider>
  );
}

const Root = () => {
  return (
    <>
      <Navbarr />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default App;