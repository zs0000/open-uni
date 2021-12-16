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

    const addCourses = (course) => {
        setCourses([...courses, course]);
    };
    return(
        <CourseContext.Provider value={{professor,enrollable, setEnrollable,assignmentsList, setAssignments,enrolled, setEnrolled,addCourses,courseTag,courseCategory, setCourseCategory, setCourseTag,courseCapacity,selectedCourse , setSelectedCourse, setCourseCapacity, setProfessor,courseDescription, setCourseDescription,courseTitle, courses,courseIdentifier, setCourseIdentifier, setCourses, setCourseTitle}}>
            {props.children}
        </CourseContext.Provider>
    );

}