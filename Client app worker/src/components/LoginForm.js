import classes from './LoginForm.module.css';
import { useRef, useState } from 'react';
import {useNavigate} from 'react-router-dom'

function LoginForm(){

  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [failureFlag, setFailureFlag] = useState(false);


    const submitHandler = async(event) => {
        event.preventDefault();

        const enteredUsername = usernameRef.current.value;
        const enteredPassword = passwordRef.current.value;

        fetch("http://localhost:4000/api/v1/users", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username: enteredUsername, password: enteredPassword })
        }).then(res=> res.json()).then(data=> {
          if(data.success){
            localStorage.setItem('loggedUser', data.user.firstName + " " + data.user.lastName);
            localStorage.setItem('loggedUsername', data.user.username);
            localStorage.setItem('loggedUserID', data.user.id);
            navigate("/requests");
          }
          else{
            setFailureFlag(true);
            setTimeout(setFailureFlag, 1000, false);
          }
          
        })
          

        
    }

  return(
    <div>
      <form className={"flex flex-column " + classes.loginFormContainer} onSubmit={submitHandler}>
          <input type="text" placeholder="Unesite korisnicko ime" id='username' required ref={usernameRef}></input>
          <input type="password" placeholder="Unesite lozinku" id='password' required ref={passwordRef}></input>
          <button className='primary-btn'>Prijavi se</button>
      </form>
      {failureFlag && <div className="dataLabel updateFailed updateNotification">Neuspesan pokusaj logovanja, podaci nisu ispravni!</div>}
    </div>
  ) 
}

export default LoginForm;