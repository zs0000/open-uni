import React, {useState, createContext} from "react";


export const UsersContext = createContext();

export const UsersContextProvider = props => {

    const [users, setUser] = useState(null);
    const addUser = (user) => {
        setUser([...users, user]);
    };

    const [usersRole, setUsersRole] = useState(null);
    const [usersFirstName, setUsersFirstName] = useState(null);
    const [usersLastName, setUsersLastName] = useState(null);
    const [usersFullName, setUsersFullName] = useState(null);

    const addUserRole = (userRole) => {
        setUsersRole([...usersRole, userRole])
    }


    return(
        <UsersContext.Provider value={{users, setUser, usersRole, addUser, setUsersRole, addUserRole,usersFirstName, setUsersFirstName, usersLastName, setUsersLastName, usersFullName, setUsersFullName}}>
            {props.children}
        </UsersContext.Provider>
    );

}