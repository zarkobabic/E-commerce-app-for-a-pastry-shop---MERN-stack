
import classes from '../pages/PersonalData.module.css';

function PersonalDataContainer(props){

    const handleInputChange = (event) => {

        let changedValue = event.target.value;
        let changedAttribute = event.target.id;

        props.setDataFromForm({...props.dataFromForm, [changedAttribute] : changedValue});
    }

    return(
        <div>
            {props.editMode && <div className={"flex flex-column flex-center " + classes.personalDataContainer}>
                <div className={"flex flex-row " + classes.rowContainer}>
                    <div className={classes.inputContainer}>
                        <h4>Ime</h4>
                        <input type="text" id='firstName' required defaultValue={props.object.firstName} value={props.dataFromForm.firstName} onChange={handleInputChange}></input>
                    </div>
                    <div className={classes.inputContainer}>
                        <h4>Kontakt telefon</h4>
                        <input type="text" id='contact' required defaultValue={props.object.contact} value={props.dataFromForm.contact} onChange={handleInputChange}></input>
                    </div>
                </div>
                <br />
                <div className={"flex flex-row " + classes.rowContainer}>
                    <div className={classes.inputContainer}>
                        <h4>Prezime</h4>
                        <input type="text" id='lastName' required defaultValue={props.object.lastName} value={props.dataFromForm.lastName} onChange={handleInputChange}></input>
                    </div>
                    <div className={classes.inputContainer}>
                        <h4>Adresa</h4>
                        <input type="text" id='address' required defaultValue={props.object.address} value={props.dataFromForm.address} onChange={handleInputChange}></input>
                    </div>
                </div>
            </div>}
            
            {!props.editMode && <div className={"flex flex-column flex-center " + classes.personalDataContainer}>
                <div className={"flex flex-row " + classes.rowContainer}>
                    <div className={classes.inputContainer}>
                        <h4>Ime</h4>
                        <div className={classes.dataLabel} id='firstNameView'>{props.object.firstName}</div>
                    </div>
                    <div className={classes.inputContainer}>
                        <h4>Kontakt telefon</h4>
                        <div className={classes.dataLabel} id='phoneView'>{props.object.contact}</div>
                    </div>
                </div>
                <br />
                <div className={"flex flex-row " + classes.rowContainer}>
                    <div className={classes.inputContainer}>
                        <h4>Prezime</h4>
                        <div className={classes.dataLabel} id='lastNameView'>{props.object.lastName}</div>
                    </div>
                    <div className={classes.inputContainer}>
                        <h4>Adresa</h4>
                        <div className={classes.dataLabel} id='addressView'>{props.object.address}</div>
                    </div>
                </div>
            </div>}
        </div>
    )
    
}

export default PersonalDataContainer;