import { useEffect, useState } from "react";
import HeaderWithMenu from "../components/HeaderWithMenu";
import NotificationContainer from "../components/NotificationContainer";

function NotificationsPage(){

    const [notificationsData, setNotificationsData] = useState([]);
    const [edited, setEdited] = useState(false);

    useEffect(() => {
        async function fetchNotificationsData() {
            const fetchLink = "http://localhost:4000/api/v1/notifications/" + localStorage.getItem("loggedUserID");

            const resultInJSON = await fetch(fetchLink);
            const resultInJSObject = await resultInJSON.json();
            setNotificationsData(resultInJSObject.notifications);
        }
        fetchNotificationsData();
    }, [edited]);

    const handleDeleteNotification = (event, idNotification) =>{

        fetch("http://localhost:4000/api/v1/notifications/delete", {
            method: 'POST',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({idNotification: idNotification})
        }).then(res=>{
            setEdited(true);
            setTimeout(setEdited, 1000, false);
        })
    }

    return <div>
        <HeaderWithMenu />
        <div className="title-underscore flex flex-column flex-center">
            <div>
                <h1>Obavestenja</h1>
                <hr />
            </div>
        </div>
        <br />
        <br />
        <div className="flex flex-column flex-center">
            {/*TODO Generisati pomocu backenda listu obavestenja iz baze */}         
            { notificationsData.map((notification, index) => (
                <NotificationContainer key={index} isSuccess={notification.isSuccess}>
                    <div className={"flex flex-row flex-space-between-centered"}>
                        <div>
                            <div>
                                {notification.items.map((item, itemIndex) => (
                                    <div key={itemIndex}>
                                        {notification.quantities[itemIndex] + ' x ' + item}
                                    </div>
                                ))}
                            </div>
                            <br />
                            <div className="light">
                                {new Date(notification.orderDate).toLocaleString()}
                            </div>
                        </div>
                        <div className="cursor-pointer" onClick={(event) => handleDeleteNotification(event, notification.idNotification)}>
                            <svg width="23" height="27" viewBox="0 0 23 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.64286 24.4688C1.64286 25.1401 1.90249 25.7839 2.36463 26.2586C2.82677 26.7333 3.45357 27 4.10714 27H18.8929C19.5464 27 20.1732 26.7333 20.6354 26.2586C21.0975 25.7839 21.3571 25.1401 21.3571 24.4688V6.75001H1.64286V24.4688ZM15.6071 10.9688C15.6071 10.745 15.6937 10.5304 15.8477 10.3721C16.0018 10.2139 16.2107 10.125 16.4286 10.125C16.6464 10.125 16.8554 10.2139 17.0094 10.3721C17.1635 10.5304 17.25 10.745 17.25 10.9688V22.7813C17.25 23.005 17.1635 23.2196 17.0094 23.3779C16.8554 23.5361 16.6464 23.625 16.4286 23.625C16.2107 23.625 16.0018 23.5361 15.8477 23.3779C15.6937 23.2196 15.6071 23.005 15.6071 22.7813V10.9688ZM10.6786 10.9688C10.6786 10.745 10.7651 10.5304 10.9192 10.3721C11.0732 10.2139 11.2821 10.125 11.5 10.125C11.7179 10.125 11.9268 10.2139 12.0808 10.3721C12.2349 10.5304 12.3214 10.745 12.3214 10.9688V22.7813C12.3214 23.005 12.2349 23.2196 12.0808 23.3779C11.9268 23.5361 11.7179 23.625 11.5 23.625C11.2821 23.625 11.0732 23.5361 10.9192 23.3779C10.7651 23.2196 10.6786 23.005 10.6786 22.7813V10.9688ZM5.75 10.9688C5.75 10.745 5.83654 10.5304 5.99059 10.3721C6.14464 10.2139 6.35357 10.125 6.57143 10.125C6.78929 10.125 6.99822 10.2139 7.15227 10.3721C7.30631 10.5304 7.39286 10.745 7.39286 10.9688V22.7813C7.39286 23.005 7.30631 23.2196 7.15227 23.3779C6.99822 23.5361 6.78929 23.625 6.57143 23.625C6.35357 23.625 6.14464 23.5361 5.99059 23.3779C5.83654 23.2196 5.75 23.005 5.75 22.7813V10.9688ZM22.1786 1.68751H16.0179L15.5353 0.701376C15.433 0.490552 15.2756 0.313211 15.0806 0.189304C14.8856 0.0653968 14.6608 -0.000159678 14.4315 9.24577e-06H8.56339C8.33461 -0.000894122 8.11022 0.0644179 7.9159 0.188463C7.72159 0.312507 7.56523 0.490267 7.46473 0.701376L6.98214 1.68751H0.821429C0.603572 1.68751 0.394639 1.7764 0.240591 1.93464C0.0865431 2.09287 0 2.30748 0 2.53126L0 4.21876C0 4.44253 0.0865431 4.65714 0.240591 4.81538C0.394639 4.97361 0.603572 5.06251 0.821429 5.06251H22.1786C22.3964 5.06251 22.6054 4.97361 22.7594 4.81538C22.9135 4.65714 23 4.44253 23 4.21876V2.53126C23 2.30748 22.9135 2.09287 22.7594 1.93464C22.6054 1.7764 22.3964 1.68751 22.1786 1.68751Z" fill="#E1515A"/>
                            </svg>
                        </div>
                    </div>
                </NotificationContainer>
            ))}
            {notificationsData.length <= 0 && <p className="colorRed">Nema novih obavestenja!</p>}
        </div>
        

    </div>
}

export default NotificationsPage;