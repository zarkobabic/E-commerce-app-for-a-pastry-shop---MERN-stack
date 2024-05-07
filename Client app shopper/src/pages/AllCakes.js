import { useEffect, useState } from "react";
import CardListContainer from "../components/CardListContainer";
import HeaderWithMenu from "../components/HeaderWithMenu";
import Pagination from "../components/Pagination";

function AllCakesPage(){


    const [cakesData, setCakesData] = useState([]);

    useEffect(() => {
        async function fetchCakesData() {
            const resultInJSON = await fetch("http://localhost:4000/api/v1/cakes/");
            const resultInJSObject = await resultInJSON.json();
            setCakesData(resultInJSObject.cakes);
        }
        fetchCakesData();
      
    }, []);


    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(3);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const postsToShow = cakesData.slice(firstPostIndex, lastPostIndex);
    
    return <div >
        <HeaderWithMenu />
        <div className="title-underscore flex flex-column flex-center">
            <div>
                <h1>Torte</h1>
                <hr />
            </div>
        </div>
        <br />
        <br />
        <div>
            <CardListContainer type="cake" imageFolder={"images/img-cakes/"} cardList={postsToShow} currentPage = {currentPage} postsPerPage={postsPerPage}/>
            <Pagination totalPosts={cakesData.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
        </div> 
    </div>
}

export default AllCakesPage;