import { useEffect, useState } from "react";
import BasicSlider from "../components/BasicSlider";
import HeaderWithMenu from "../components/HeaderWithMenu";

function MainPage(){

    const [promotionsData, setPromotionsData] = useState([]);


    useEffect(() => {
        async function fetchPromotionsData() {
            const resultInJSON = await fetch("http://localhost:4000/api/v1/promotions/");
            const resultInJSObject = await resultInJSON.json();
            setPromotionsData(resultInJSObject.promotions);
        }
        fetchPromotionsData();
    }, []);
    
    return <div>
        <HeaderWithMenu />
        <BasicSlider adsArray={promotionsData} />
    </div>
}

export default MainPage;