import React, {useState, createContext} from "react";


export const SelectedUserContext = createContext();

export const SelectedUserContextProvider = props => {

    const [users, setUser] = useState(null);
    const addUser = (user) => {
        setUser([...users, user]);
    };
    const [selectedUser, setSelectedUser] = useState([]);
    const [selectedUsersRole, setSelectedUsersRole] = useState(null);
    const [selectedUsersFirstName, setSelectedUsersFirstName] = useState(null);
    const [selectedUsersLastName, setSelectedUsersLastName] = useState(null);
    const [selectedUsersFullName, setSelectedUsersFullName] = useState(null);
    const [selectedUsersUsername, setSelectedUsersUsername] = useState(null);
    const [selectedUsersCourses, setSelectedUsersCourses] = useState(null);
    

    return(
        <SelectedUserContext.Provider value={{
            selectedUser, setSelectedUser,
            selectedUsersRole, setSelectedUsersRole,
            selectedUsersFirstName, setSelectedUsersFirstName,
            selectedUsersLastName, setSelectedUsersLastName,
            selectedUsersFullName, setSelectedUsersFullName,
            selectedUsersUsername, setSelectedUsersUsername,
            selectedUsersCourses, setSelectedUsersCourses
            }}>
            {props.children}
        </SelectedUserContext.Provider>
    );

}