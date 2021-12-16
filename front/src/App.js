import React, { useState, useEffect, Component, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Link, Navigate } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Dashboard from "./routes/Dashboard";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from "./styles/Navbar.module.css"
import { UsersContext, UsersContextProvider} from './context/UsersContext';
import { CourseContextProvider } from "./context/CourseContext";
import Navbar from "./components/common/Navbar/Navbar";
import AuthFinder from "./apis/AuthFinder";
import ClassCreate from "./routes/ClassCreate";
import ViewClasses from "./components/common/ViewClasses/ViewClasses";
import ViewClassDetails from "./components/common/ViewClassDetails/ViewClassDetails";
import ClassDetails from "./routes/ClassDetails";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import TeachersCreateAssignmentComponent from "./components/common/TeachersCreateAssignmentComponent/TeachersCreateAssignmentComponent";
import TeachersCreateAssignment from "./routes/TeachersCreateAssignment";
import ClassAssignments from "./routes/ClassAssignments";
import NotEnrolledClassView from "./components/common/NotEnrolledClassView/NotEnrolledClassView";


toast.configure()

const queryClient = new QueryClient()


const App = () => {
  
  const  [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      let token = localStorage.getItem("token")
      const response = await AuthFinder.get("/is-verify",{
        headers: { token }
      })
      const parseRes = response.data

      
      
     parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
       
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    isAuth()
  },[])

  
  return (
    <UsersContextProvider>
      <CourseContextProvider>
        <QueryClientProvider client={queryClient}>
<div className={s.bar}>
  <Navbar setAuth={setAuth} />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={!isAuthenticated ? <Login  setAuth={setAuth} /> : <Navigate to="/dashboard/"/>}/>
          <Route path="/register" element={!isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate to="/login"/>}/>
          <Route
          path="/dashboard/"
          element={isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Navigate to="/login" /> }
          />
          <Route
          path="/create_class"
          element={isAuthenticated ? <ClassCreate setAuth={setAuth} /> : <Navigate to="/login" /> }
          />
          <Route path="/create_assignment" element={<TeachersCreateAssignmentComponent/>}/>
          <Route path="view"  >
            <Route path=":course_id" element={<ClassDetails/> } />
          </Route>
          <Route path="join"  >
            <Route path=":course_id" element={isAuthenticated ? <NotEnrolledClassView setAuth={setAuth} /> : <Navigate to="/dashboard/"/> } />
          </Route>
          <Route path="assignments"  >
            <Route path=":course_id" element={<ClassAssignments/> } />
          </Route>
          
          <Route
      path="*"
        element={isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Navigate to="/login" /> }
      
    />
          
        </Routes>
   
    </div>
    </QueryClientProvider>
    </CourseContextProvider>
</UsersContextProvider>
  );
      }
export default App;