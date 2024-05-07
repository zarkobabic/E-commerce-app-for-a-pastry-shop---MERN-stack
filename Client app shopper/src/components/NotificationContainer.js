import classes from "./NotificationContainer.module.css";

function NotificationContainer(props){

    let success = props.isSuccess ? "je prihvacena" : "je odbijena";

    return(
        <div className={"flex flex-column " + classes.notificationMainContainer}>
            <h3>Vasa narudzbina:</h3>
            <hr />
            <br />
            <p>{props.children}</p>
            <br />
            <h3>{success}</h3>
        </div>
    )
}

export default NotificationContainer;