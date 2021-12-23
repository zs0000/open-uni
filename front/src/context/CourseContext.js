import React, {useState, createContext} from "react";

export const CourseContext = createContext();

export const CourseContextProvider = props => {


    const [professor, setProfessor] = useState(null);
    const [courseTitle, setCourseTitle] = useState(null);
    const [courseDescription, setCourseDescription] = useState(null);
    const [courseCapacity, setCourseCapacity] = useState(null);
    const [courses, setCourses] = useState([]);
    const [selectedCourse , setSelectedCourse] = useState(null);
    const [courseTag, setCourseTag] = useState(null);
    const [courseCategory, setCourseCategory] = useState(null);
    const [courseIdentifier, setCourseIdentifier] = useState(null);
    const [enrolled, setEnrolled] = useState(null)
    const [enrollable, setEnrollable] = useState(null)
    const [assignmentsList, setAssignments] = useState([])
    const [announcementsList, setAnnouncements] = useState([])
    const [recentAnnouncement, setRecentAnnouncement] = useState(null)
    const [selectedAssignment, setSelectedAssignment] = useState(null)
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null)
    
    const addCourses = (course) => {
        setCourses([...courses, course]);
    };
    return(
        <CourseContext.Provider value={{professor,recentAnnouncement, setRecentAnnouncement,selectedAnnouncement, setSelectedAnnouncement,announcementsList, setAnnouncements,selectedAssignment, setSelectedAssignment,enrollable, setEnrollable,assignmentsList, setAssignments,enrolled, setEnrolled,addCourses,courseTag,courseCategory, setCourseCategory, setCourseTag,courseCapacity,selectedCourse , setSelectedCourse, setCourseCapacity, setProfessor,courseDescription, setCourseDescription,courseTitle, courses,courseIdentifier, setCourseIdentifier, setCourses, setCourseTitle}}>
            {props.children}
        </CourseContext.Provider>
    );

}