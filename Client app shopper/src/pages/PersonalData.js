import { useState, useEffect } from "react";
import HeaderWithMenu from "../components/HeaderWithMenu";
import classes from './PersonalData.module.css';
import PersonalDataContainer from "../components/PersonalDataContainer";

function PersonalDataPage(){

let buttonText;
let modeText;

const [editMode, setEditMode] = useState(false);
const [personalData, setPersonalData] = useState([]);
const [dataFromForm, setDataFromForm] = useState({});
const [successEdit, setSuccessEdit] = useState(false);
const [failedEdit, setFailedEdit] = useState(false);
const [editedContent, setEditedContent] = useState(false);

useEffect(() => {
    fetch("http://localhost:4000/api/v1/users/username", {
        method: 'POST',
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: localStorage.getItem("loggedUsername")})
    }).then(res=> res.json()).then(data=> {
    setPersonalData(data.user)
    })
}, [editedContent]);

function toggleStateHandler(){
    setEditMode(!editMode);
}

const handleEditUserUpdate = (event) => {

    fetch("http://localhost:4000/api/v1/users/editUser", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: localStorage.getItem("loggedUsername"), user: dataFromForm})
    }).then(res=>res.json()).then(data => {
        if(data.success){
            setEditedContent(true);
            setSuccessEdit(true);
            setTimeout(setSuccessEdit, 1000, false);
            setTimeout(setEditedContent, 10, false);
            let updatedFirstName = personalData.firstName;
            let updatedLastName = personalData.lastName;
            
            if(dataFromForm.firstName) updatedFirstName = dataFromForm.firstName;
            if(dataFromForm.lastName) updatedLastName = dataFromForm.lastName;

            let fullName = updatedFirstName + " " + updatedLastName;
            //if first or last name is changed, update the session storage full name
            if((dataFromForm.firstName || dataFromForm.lastName)){
                localStorage.setItem("loggedUser", fullName);
            }
        }
        else{
            setFailedEdit(true);
        }
    })

}


if(editMode){
    buttonText = "Promeni na mod za citanje";
    modeText = "Mod za izmenu";
}
else{
    buttonText = "Promeni na mod za izmenu";
    modeText = "Mod za citanje";
}

    return <div>
        <HeaderWithMenu />
        <div className="title-underscore flex flex-column flex-center">
            <div>
                <h1>Licni podaci</h1>
                <hr />
                <h4 className={classes.redText}>{modeText}</h4>
            </div>
        </div>
        <br />
        <br />
        <PersonalDataContainer dataFromForm = {dataFromForm} setDataFromForm = {setDataFromForm} editMode={editMode} object={personalData} />

        <div className="flex flex-center flex-column">
            <button className={'primary-btn ' + classes.actionButton} onClick={toggleStateHandler}>{buttonText}</button>
            <br />
            {editMode && <button onClick={(event) => handleEditUserUpdate(event)}  className={'primary-btn ' + classes.saveChanges}>Sacuvaj izmene</button>}
            <br />
            
            {successEdit && <div className={classes.dataLabel + " " + classes.updateSuccess + " " + classes.updateNotification}>Izmene su uspešno sačuvane!</div>}
            {failedEdit && <div className={classes.dataLabel + " " + classes.updateFailed + " " + classes.updateNotification}>Izmene nisu uspešno sačuvane!</div>}
        </div>
        
    </div>
}

export default PersonalDataPage;