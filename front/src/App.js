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
import { AssignmentContextProvider } from "./context/AssignmentContext";
import Navbar from "./components/common/Navbar/Navbar";
import AuthFinder from "./apis/AuthFinder";
import ClassCreate from "./routes/ClassCreate";
import ViewClasses from "./components/common/ViewClasses/ViewClasses";
import ViewClassDetails from "./components/common/ViewClassDetails/ViewClassDetails";
import ClassDetails from "./routes/ClassDetails";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import TeachersCreateAssignmentComponent from "./components/common/TeachersCreateAssignmentComponent/TeachersCreateAssignmentComponent";
import TeachersCreateAssignment from "./routes/TeachersCreateAssignment";
import TeachersCreateAnnoucementComponent from "./components/common/TeachersCreateAnnouncement/TeachersCreateAnnouncementComponent";
import ClassAssignments from "./routes/ClassAssignments";
import ClassAnnouncements from "./routes/ClassAnnouncements";
import NotEnrolledClassView from "./components/common/NotEnrolledClassView/NotEnrolledClassView";
import ViewAssignmentDetails from "./routes/ViewAssignmentDetails";
import ViewAnnouncementDetails from "./routes/ViewAnnouncementDetails";
import { AnnouncementContextProvider } from "./context/AnnouncementContext";
import ClassStudents from "./routes/ClassStudents";
import ViewStudentsPage from "./routes/ViewStudentsPage";
import { MessagesContextProvider } from "./context/MessagesContext";
import ViewOpenCourses from "./routes/ViewOpenCourses";
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { SelectedUserContextProvider } from "./context/SelectedUserContext";
import ViewStudentProfile from "./routes/ViewStudentProfile";
import ViewConversationPage from "./routes/ViewConversationPage";
import ClassQuestions from "./routes/ClassQuestions";
import CreateAQuestionPage from "./routes/CreateAQuestionPage";
import ViewQuestionPage from "./routes/ViewQuestionPage";
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
        <AssignmentContextProvider>
          <AnnouncementContextProvider>
            <MessagesContextProvider>
              <SelectedUserContextProvider>
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
          <Route path="/create_announcement" element={<TeachersCreateAnnoucementComponent/>}/>
          <Route path="/open_courses" element={isAuthenticated ? <ViewOpenCourses/> : <Navigate to="/login" />}/>
          <Route path="view"  >
            <Route path=":course_id" element={isAuthenticated ? <ClassDetails/> : <Navigate to="/login" /> } />
            
          
          </Route>
          <Route path="join"  >
            <Route path=":course_id" element={isAuthenticated ? <NotEnrolledClassView setAuth={setAuth} /> : <Navigate to="/dashboard/"/> } />
          </Route>
          <Route path="profile"  >
            <Route path=":user_username" element={<ViewStudentProfile  /> } />
          </Route>
          <Route path="assignments"  >
            <Route path=":course_id" element={<ClassAssignments/> } />
            <Route path=":course_id/:assignment_id" element={<ViewAssignmentDetails/> } />
          </Route>
          <Route path="announcements"  >
            <Route path=":course_id" element={<ClassAnnouncements/> } />
            <Route path=":course_id/:announcement_id" element={<ViewAnnouncementDetails/> } />
          </Route>
          <Route path="roster"  >
            <Route path=":course_id" element={<ViewStudentsPage/> } />
            <Route path=":course_id/:course_user_combo" element={<ViewAnnouncementDetails/> } />
          </Route>
          <Route path="inbox"  >
            <Route path=":conversation_key" element={<ViewConversationPage/>} />
          </Route>
          <Route path="questions"  >
            <Route path=":course_id" element={isAuthenticated ? <ClassQuestions/> : <Navigate to="/login"/>} />
            <Route path=":course_id/:question_id" element={isAuthenticated ? <ViewQuestionPage/> : <Navigate to="/login"/>} />
            
          </Route>
          <Route path="ask_question"  >
            <Route path=":course_id" element={isAuthenticated ? <CreateAQuestionPage/> : <Navigate to="/login"/>} />
          </Route>
         
          
          <Route
      path="*"
        element={isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Navigate to="/login" /> }
      
    />
          
        </Routes>
        <script>
             AOS.init()
         </script>
    </div>
    
    </QueryClientProvider>
    </SelectedUserContextProvider>
    </MessagesContextProvider>
    </AnnouncementContextProvider>
    </AssignmentContextProvider>
    </CourseContextProvider>
</UsersContextProvider>
  );
      }
export default App;