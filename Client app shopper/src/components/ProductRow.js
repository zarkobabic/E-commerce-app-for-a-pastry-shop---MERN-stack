import { useState } from "react";
import classes from "./ProductRow.module.css";
import {useDispatch} from 'react-redux';
import {update} from '../redux/store/cartSlice';
import {remove} from '../redux/store/cartSlice';

function ProductRow(props){

    const [updatedQuantityForCart, setUpdatedQuantityForCart] = useState();


    const dispatch = useDispatch();
    const deleteProductFromCart = (idProduct) => {
        dispatch(remove(idProduct));
    }

    const formUpdateQuantity = (event) => {
        event.preventDefault();
        if(updatedQuantityForCart <= 0){
            setUpdatedQuantityForCart("");
            return;
        } 
        dispatch(update({'idProduct': props.idProduct, 'newQuantity': updatedQuantityForCart}));
        setUpdatedQuantityForCart("");
    }

    const handleUpdatedQuantityInputChange = (event) =>{
        setUpdatedQuantityForCart(event.target.value);
    }


    return(
        <div className={"flex flex-row flex-center " + classes.productMainContainer}>
            <div className={classes.productNameAndQuantityContainer}>
                <p>{props.productQuantity + " x " + props.productName}</p>
            </div>
            <div className={"grey " + classes.productRowPrice}>
                <p>{props.productPrice}</p>
            </div>
            <div className={"flex flex-row " + classes.productActionsContainer}>
                <form onSubmit={(event) => formUpdateQuantity(event)}>
                <div className={"flex flex-row gap10 " + classes.updateQuantityContainer}>
                    <input type="number" placeholder="Unesite kolicinu" id='newQuantity' value={updatedQuantityForCart} onChange={handleUpdatedQuantityInputChange} required></input>
                    <button className='primary-btn'>Azuriraj</button>
                </div>
                </form>
                <div className={"flex flex-column " + classes.deleteButtonContainer}>
                    <button onClick={(event) => deleteProductFromCart(props.idProduct)} className='primary-btn'>Ukloni</button>
                </div>
            </div>

        </div>
    )

}

export default ProductRow;

