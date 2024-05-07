import {useEffect, useState } from "react";
import CardListContainer from "../components/CardListContainer";
import HeaderWithMenu from "../components/HeaderWithMenu";
import Pagination from "../components/Pagination";


function AllCookiesPage(){


    const [cookiesData, setCookiesData] = useState([]);

    useEffect(() => {
        async function fetchCookiesData() {
            const resultInJSON = await fetch("http://localhost:4000/api/v1/cookies/");
            const resultInJSObject = await resultInJSON.json();
            setCookiesData(resultInJSObject.cookies);
        }
        fetchCookiesData();
      
    }, []);



    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(3);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const postsToShow = cookiesData.slice(firstPostIndex, lastPostIndex);
    
    return <div >
        <HeaderWithMenu />
        <div className="title-underscore flex flex-column flex-center">
            <div>
                <h1>Kolaci</h1>
                <hr />
            </div>
        </div>
        <br />
        <br />
        <div>
        <CardListContainer type="cookie" imageFolder={"images/img-cookies/"} cardList={postsToShow} currentPage = {currentPage} postsPerPage={postsPerPage}/>
            <Pagination totalPosts={cookiesData.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
        </div>
        
        
    </div>
}

export default AllCookiesPage;