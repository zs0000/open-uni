import React, { Fragment, useState, useContext } from "react"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AuthFinder from "../apis/AuthFinder";
import { UsersContext } from "../context/UsersContext";
import { useQuery } from 'react-query'
import s from "../styles/Login.module.css";


export default function Login({setAuth}) {
  const {users, setUser} = useContext(UsersContext)
  const {usersRole, setUsersRole} = useContext(UsersContext)
  const {usersFirstName, setUsersFirstName} = useContext(UsersContext)
  const {usersLastName, setUsersLastName} = useContext(UsersContext)
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })
  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({...inputs, [e.target.name]
    : e.target.value})
}

const onSubmitForm = async (e) => {
  e.preventDefault();
  try {
      const body = { email, password };
      const response = await AuthFinder.post('/login', {
          email,
          password,
      })
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username)
      localStorage.setItem('is-user', 'user' )
      localStorage.setItem('first-name', response.data.firstname)
      localStorage.setItem('last-name', response.data.lastname)
      console.log(response)
      setUsersRole(response.data.role)
      setUser(response.data.username);
      setUsersFirstName(response.data.firstname);
      setUsersLastName(response.data.lastname);
      
      setAuth(true);
      toast.success("Logged in Successfully");

  } catch (err) {
      setAuth(false);
      console.log(err);
    
      toast.error("Invalid username/password combination");
  }
}
    return (
      <Fragment>
        <div className={s.main}>
          <form onSubmit={onSubmitForm} className={s.form}>
          <div className={s.loginform}>
            <label className={s.inputlabel}>
              Email address
            </label>
              <input 
              type="email" 
              name="email" 
              placeholder="Enter your Email"
              className={s.input}
              value={email}
              onChange={e => onChange(e)}
              ></input>
            </div>
            <div className={s.loginform}>
            <label className={s.inputlabel}>
              Password
            </label>
              <input 
              type="password" 
              name="password" 
              placeholder="Enter your Password"
              className={s.input}
              value={password}
              onChange={e => onChange(e)}
              ></input>
            </div>
            <button className={s.loginbutton}>Sign in</button>
            <div className={s.two}>
                      <div className={s.three}>
                        <div className={s.four}></div>
                      </div>
                      <div className={s.five}>
                        <span className={s.six}>Don't have an account?</span>
                      </div>
                    </div>
                 
            <Link to="/register" className={s.loginbuttontwo}>Sign up</Link>
          </form>
          
        </div>
      </Fragment>
    );
  }