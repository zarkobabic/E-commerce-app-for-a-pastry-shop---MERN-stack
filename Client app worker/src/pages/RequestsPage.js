import { useEffect, useState } from "react";
import HeaderWithMenu from "../components/HeaderWithMenu";
import OrderContainer from "../components/OrderContainer";
import classes from "./RequestsPage.module.css"
import UserInfo from "../components/UserInfo";





function RequestsPage(){

    const [ordersData, setOrdersData] = useState([]);
    const [edited, setEdited] = useState(false);

    useEffect(() => {
        async function fetchRequestsData() {
            
            const resultInJSON = await fetch("http://localhost:4000/api/v1/orders/all");
            const resultInJSObject = await resultInJSON.json();
            setOrdersData(resultInJSObject.allOrders);
        }
        fetchRequestsData();
    }, [edited]);


    const handleDenyOrder = (event, order) =>{

        //Changing the status of order
        fetch("http://localhost:4000/api/v1/orders/deny", {
            method: 'POST',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({ idOrder: order.idOrder})
        }).then(res=> res.json()).then(data=> {
            if(data.success){
            setEdited(true);
            setTimeout(setEdited, 1000, false);
            }
        })

        //Creating notification

        
        let itemsTitle = [];
        let itemsQuantities = [];

        order.items.forEach(element => {
            itemsTitle.push(element.title);
            itemsQuantities.push(element.quantity);
        });

        //creating notification
        fetch("http://localhost:4000/api/v1/notifications/add", {
            method: 'POST',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({items: itemsTitle, quantities: itemsQuantities, idUser: order.idUser, isSuccess: false, orderDate: order.dateCreated})
        })
    }

    const handleAcceptOrder = (event, order) =>{
        
        //Changing the status of order

        fetch("http://localhost:4000/api/v1/orders/accept", {
            method: 'POST',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({ idOrder: order.idOrder})
        }).then(res=> res.json()).then(data=> {
            if(data.success){
            setEdited(true);
            setTimeout(setEdited, 1000, false);
            }
        })

        let itemsTitle = [];
        let itemsQuantities = [];

        order.items.forEach(element => {
            itemsTitle.push(element.title);
            itemsQuantities.push(element.quantity);
        });

        //creating notification
        fetch("http://localhost:4000/api/v1/notifications/add", {
            method: 'POST',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({items: itemsTitle, quantities: itemsQuantities, idUser: order.idUser, isSuccess: true, orderDate: order.dateCreated})
        })
    }

    return <div>
        <HeaderWithMenu />
        <div className="title-underscore flex flex-column flex-center">
            <div>
                <h1>Zahtevi za narudzbine</h1>
                <hr />
            </div>
        </div>
        <br />
        <br />
        <div className="flex flex-column flex-center">  
            { ordersData.map((order, index) => (
                <OrderContainer key={index}>
                    <div>
                        {new Date(order.dateCreated).toLocaleString()}
                    </div>
                    <br />
                    <div>
                        {order.items.map((item, itemIndex) => (
                            <div key={itemIndex}>
                                {item.quantity + ' x ' + item.title}
                            </div>
                        ))}
                    </div>
                    <br />
                    <br />
                    <div className={ classes.userDataAndActionsContainer + " flex flex-row"}>
                        <div className={classes.orderUserData}>
                        <UserInfo idUser = {order.idUser}/>

                        </div>
                        <div className={classes.actionButtons + " flex flex-row"}>
                            <div onClick={(event) => handleDenyOrder(event, order)}>
                                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M25 0C11.1895 0 0 11.1895 0 25C0 38.8105 11.1895 50 25 50C38.8105 50 50 38.8105 50 25C50 11.1895 38.8105 0 25 0ZM37.2581 31.5625C37.7319 32.0363 37.7319 32.8024 37.2581 33.2762L33.2661 37.2581C32.7923 37.7319 32.0262 37.7319 31.5524 37.2581L25 30.6452L18.4375 37.2581C17.9637 37.7319 17.1976 37.7319 16.7238 37.2581L12.7419 33.2661C12.2681 32.7923 12.2681 32.0262 12.7419 31.5524L19.3548 25L12.7419 18.4375C12.2681 17.9637 12.2681 17.1976 12.7419 16.7238L16.7339 12.7319C17.2077 12.2581 17.9738 12.2581 18.4476 12.7319L25 19.3548L31.5625 12.7419C32.0363 12.2681 32.8024 12.2681 33.2762 12.7419L37.2681 16.7339C37.7419 17.2077 37.7419 17.9738 37.2681 18.4476L30.6452 25L37.2581 31.5625Z" fill="#E1515A"/>
                                </svg>
                            </div>
                            <div onClick={(event) => handleAcceptOrder(event, order)}>
                                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M50 25C50 38.8072 38.8072 50 25 50C11.1928 50 0 38.8072 0 25C0 11.1928 11.1928 0 25 0C38.8072 0 50 11.1928 50 25ZM22.1083 38.2373L40.6567 19.6889C41.2865 19.0591 41.2865 18.0378 40.6567 17.408L38.3757 15.127C37.7459 14.4971 36.7246 14.4971 36.0947 15.127L20.9677 30.2538L13.9053 23.1914C13.2755 22.5616 12.2542 22.5616 11.6243 23.1914L9.34335 25.4724C8.71351 26.1022 8.71351 27.1235 9.34335 27.7533L19.8272 38.2372C20.4572 38.8671 21.4783 38.8671 22.1083 38.2373Z" fill="#9DD788"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                </OrderContainer>
            ))}
            
            {ordersData.length <= 0 && <p className="colorRed">Nema novih zahteva za narudzbine!</p>}
        </div>
        

    </div>
}

export default RequestsPage;