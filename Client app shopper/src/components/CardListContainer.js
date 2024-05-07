import classes from './CardListContainer.module.css';
import { Link } from "react-router-dom";

function CardListContainer(props){
    
    return(
        <div className={"flex flex-row " + classes.listContainer}>
        {props.cardList.map((item, index)=>{
            return(
                <Link className={classes.Link} key={index} to={`/details/${props.type}/${item.idProduct}`}>
                    <div className={"flex flex-column flex-center " + classes.cardContainer}>
                        <img src={props.imageFolder + item.image} alt="" />
                        <h3 className='grey'>{item.title}</h3>    
                    </div>
                </Link>
            )
        })}
        </div>
    ) 
    
}

export default CardListContainer;