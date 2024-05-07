import classes from "./OrderContainer.module.css";

function OrderContainer(props){

    return(
        <div className={"flex flex-column " + classes.notificationMainContainer}>
            <h3>Narudzbina:</h3>
            <hr />
            <br />
            <p>{props.children}</p>
            <br />
        </div>
    )
}

export default OrderContainer;