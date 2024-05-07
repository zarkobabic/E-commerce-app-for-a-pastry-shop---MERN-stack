import HeaderWithMenu from "../components/HeaderWithMenu";
import classes from './UpdatePassword.module.css';
import { useState } from "react";

function UpdatePasswordPage(){


    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [reenteredPassword, setReenteredPassword] = useState("");
    const [successFlag, setSuccessFlag] = useState(false);
    const [failureFlag, setFailureFlag] = useState(false);


    const passwordInputsChanging = (event) =>{
        if(!event.target.value) return;

        if(event.target.id === "oldPassword") setOldPassword(event.target.value);
        else if(event.target.id === "newPassword") setNewPassword(event.target.value);
        else setReenteredPassword(event.target.value);
    }

    const changePassword = (event) =>{
        event.preventDefault();


        if(newPassword === reenteredPassword){
            fetch("http://localhost:4000/api/v1/users/changePassword",{
                method: 'POST',
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: localStorage.getItem("loggedUsername"), "oldPassword": oldPassword, "newPassword": newPassword, "reenteredPassword": reenteredPassword})
            }).then(res=>res.json()).then(data=>{
                if(data.success){
                    setSuccessFlag(true);
                    setTimeout(setSuccessFlag, 1000, false);
                }
                else{
                    setFailureFlag(true);
                    setTimeout(setFailureFlag, 1000, false);
                }
            })
        }
        else{
            setFailureFlag(true);
            setTimeout(setFailureFlag, 1000, false);
        }
    }


    return <div>
        <HeaderWithMenu />
        <form onSubmit={changePassword}>
            <div className="title-underscore flex flex-column flex-center">
                <div>
                    <h1>Izmena lozinke</h1>
                    <hr />
                </div>
                <br />
                <br />
                <div className={classes.inputContainer}>
                                <h4>Stara lozinka</h4>
                                <input type="password" id='oldPassword' onChange={passwordInputsChanging} required></input>
                </div>
                <br />
                <div className={classes.inputContainer}>
                            <h4>Nova lozinka</h4>
                            <input type="password" id='newPassword' onChange={passwordInputsChanging} required></input>
                </div>
                <br />
                <div className={classes.inputContainer}>
                            <h4>Potvrdi novu lozinku</h4>
                            <input type="password" id='reenteredPassword' onChange={passwordInputsChanging} required></input>
                </div>
                <br />
                <br />
                <br />
                <button type="submit" className={'primary-btn ' + classes.btnChange}>Izmeni lozinku</button>
                <br />
                {successFlag && <div className={classes.dataLabel + " " + classes.updateSuccess + " " + classes.updateNotification}>Izmene su uspešno sačuvane!</div>}
                {failureFlag && <div className={classes.dataLabel + " " + classes.updateFailed + " " + classes.updateNotification}>Izmene nisu uspešno sačuvane!</div>}
            </div>
        </form>
    </div>

}

export default UpdatePasswordPage;