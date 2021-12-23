import React, { useState, createContext } from "react";

export const AssignmentContext = createContext();

export const AssignmentContextProvider = props => {

    const [assignmentTitle, setAssignmentTitle] = useState(null)
    const [assignmentDescription, setAssignmentDescription] = useState(null);
    const [assignmentInstruction, setAssignmentInstruction] = useState(null);
    const [assignmentDate, setAssignmentDate] = useState(null);
    const [assignmentDue, setAssignmentDue] = useState(null);
    const [assignmentLink, setAssignmentLink] = useState(null);

    return(
        <AssignmentContext.Provider value={{
        assignmentTitle, setAssignmentTitle,
        assignmentDescription, setAssignmentDescription,
        assignmentInstruction, setAssignmentInstruction,
        assignmentDate, setAssignmentDate,
        assignmentDue, setAssignmentDue,
        assignmentLink, setAssignmentLink
        }}>
            {props.children}
        </AssignmentContext.Provider>
    )


}