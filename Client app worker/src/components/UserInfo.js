import { useEffect } from "react"
import { useState } from "react";

function UserInfo(props){

    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        async function fetchUserInfoData() {
            const resultInJSON = await fetch("http://localhost:4000/api/v1/users/" + props.idUser);
            const resultInJSObject = await resultInJSON.json();
            setUserInfo(resultInJSObject.user);
        }
        fetchUserInfoData();
    }, [props.idUser]);

    return(
        <div>
            <h3>{userInfo.firstName + " " + userInfo.lastName}</h3>
            <p>{userInfo.address}</p>
            <p>{userInfo.contact}</p>
        </div>
    ) 
    
}

export default UserInfo;