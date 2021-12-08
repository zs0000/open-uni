import React, {Fragment, useContext, useState} from "react";
import { toast } from "react-toastify";
import s from "../styles/Register.module.css"
import { Link } from "react-router-dom";
import { UsersContext } from "../context/UsersContext";
import AuthFinder from "../apis/AuthFinder";
export default function Register({
    setAuth,
}) {
    const {users, setUser } = useContext(UsersContext)
    const [ inputs, setInputs ] = useState({
        firstname:"",
        lastname:"",
        email: "",
        password: "",
        username: "",
        role: "user"
    })

    const {firstname, lastname, email, password, username, role} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]
        : e.target.value})
    }

    const onSubmitForm = async (e) => {
      e.preventDefault();
      try {
          const body = { firstname, lastname, username, email, password, role };
          const response = await AuthFinder.post("/register", {
              firstname,
              lastname,
              username,
              email,
              password,
              role
          })

          localStorage.setItem("token", response.data.token);
 
          setUser(response.data.username);
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
              First Name
            </label>
              <input 
              type="text" 
              name="firstname" 
              placeholder="Enter your first name."
              value={firstname}
              className={s.input}
              onChange={e => onChange(e)}
              ></input>
            </div>
          <div className={s.loginform}>
          <label className={s.inputlabel}>
              Last Name
            </label>
              <input 
              type="text" 
              name="lastname" 
              placeholder="Enter your last name."
              value={lastname}
              className={s.input}
              onChange={e => onChange(e)}
              ></input>
            </div>
          <div className={s.loginform}>
          <label className={s.inputlabel}>
              Username
            </label>
              <input 
              type="text" 
              name="username" 
              placeholder="Enter your Username"
              value={username}
              className={s.input}
              onChange={e => onChange(e)}
              ></input>
            </div>
            <div className={s.loginform}>
            <label className={s.inputlabel}>
              Email address
            </label>
              <input 
              type="email" 
              name="email" 
              placeholder="Enter your Email"
              value={email}
              className={s.input}
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
            <button className={s.loginbutton}>Sign up</button>
            <div className={s.two}>
                      <div className={s.three}>
                        <div className={s.four}></div>
                      </div>
                      <div className={s.five}>
                        <span className={s.six}>Already have an account?</span>
                      </div>
                    </div>
                 
            <Link to="/login" className={s.loginbuttontwo}>Sign in</Link>
          </form>
          </div>
      </Fragment>
    );
  }