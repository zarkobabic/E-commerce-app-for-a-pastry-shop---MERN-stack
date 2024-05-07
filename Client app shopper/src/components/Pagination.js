import classes from './Pagination.module.css';

function Pagination(props){

    function handleOnClickPrevious(){
        if(props.currentPage > 1){
            props.setCurrentPage(props.currentPage - 1);
        }
    }

    function handleOnClickNext(){
        if(props.currentPage < Math.ceil(props.totalPosts/props.postsPerPage)){
            props.setCurrentPage(props.currentPage + 1);
        }
    }

    let pages = [];

    for(let i = 1; i <= Math.ceil(props.totalPosts/props.postsPerPage); i++){
        pages.push(i);
    }

    return(
        <div className={"flex flex-row flex-center flex-justify-content-center " +  classes.paginationContainer}>
            
            <svg onClick={handleOnClickPrevious} xmlns="http://www.w3.org/2000/svg" width="30" height="46" viewBox="0 0 30 46" fill="none">
                <path d="M1.02148 20.557L20.7614 1.01312C22.1258 -0.337707 24.332 -0.337707 25.6819 1.01312L28.9622 4.26086C30.3266 5.61168 30.3266 7.796 28.9622 9.13246L14.9846 23L28.9767 36.8532C30.3411 38.204 30.3411 40.3883 28.9767 41.7248L25.6964 44.9869C24.332 46.3377 22.1258 46.3377 20.7759 44.9869L1.03599 25.443C-0.342902 24.0922 -0.342902 21.9078 1.02148 20.557Z" fill="black" fillOpacity="0.75"/>
            </svg>
            {
                pages.map((page, index) => {
                    return <button key={index} onClick={()=> props.setCurrentPage(page)} className={page == props.currentPage ? classes.active : ""}>{page}</button>
                })
            }

            <svg onClick={handleOnClickNext} xmlns="http://www.w3.org/2000/svg" width="30" height="46" viewBox="0 0 30 46" fill="none">
                <path d="M28.978 25.443L9.22853 44.9869C7.86349 46.3377 5.6562 46.3377 4.30568 44.9869L1.02378 41.7391C-0.34126 40.3883 -0.34126 38.204 1.02378 36.8675L15.0227 23.0144L1.02378 9.1612C-0.34126 7.81037 -0.34126 5.62605 1.02378 4.2896L4.29116 1.01312C5.6562 -0.337707 7.86349 -0.337707 9.21401 1.01312L28.9635 20.557C30.3431 21.9078 30.3431 24.0922 28.978 25.443Z" fill="black" fillOpacity="0.75"/>
            </svg>
        </div>
    ) 
    
}

export default Pagination;