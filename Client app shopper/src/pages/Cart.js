import HeaderWithMenu from "../components/HeaderWithMenu";
import ProductRow from "../components/ProductRow";
import classes from "./Cart.module.css";
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {removeAll} from '../redux/store/cartSlice';

function CartPage(){

    const dispatch = useDispatch();
    const itemsInCartArray = useSelector(state => state.cart);
    const calculateTotal = () => {
        let total = 0;
        itemsInCartArray.forEach(element => {
            total += element.quantity * Number(element.price.slice(0, -3));
        });
        return total + "din";
    }

    const makeOrder = () =>{

        const items = itemsInCartArray.map(item => {
            return ({
                quantity: item.quantity,
                idProduct: item.idProduct,
                price: item.price,
                title: item.title
            })
        })

        fetch("http://localhost:4000/api/v1/orders/add", {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ items: items, idUser: localStorage.getItem("loggedUserID")})
          }).then(res=> res.json()).then(data=> {
            if(data.success){
                dispatch(removeAll());
            }
          })
    }

    return <div>
            <HeaderWithMenu />
            <div className="title-underscore flex flex-column flex-center">
                <div>
                    <h1>Korpa</h1>
                    <hr />
                </div>
            </div>
            <br />
            <br />
            <br />
            <div className={"flex flex-row gap10 " + classes.cartMainContainer}>
                <div className={classes.leftSide}></div>
                <div className={"flex flex-column flex-center " + classes.productsContainer}>
                    <br />
                    <h2 className= {"colorWhite " + classes.cartTitle}>Vasa narudzbina:</h2>
                    <hr />
                    <br />

                    {itemsInCartArray.length <= 0 && <p className="colorWhite">Korisnicka korpa je prazna!</p>}

                    {itemsInCartArray.map((item, index) => <ProductRow key={index} idProduct={item.idProduct} productQuantity={item.quantity} productName={item.title} productPrice={item.price}/>)}
                    <br />
                    <br />
                    <div>
                        <h2 className={"colorWhite " + classes.totalPrice}>Ukupno: {calculateTotal()} </h2>
                    </div>
                    <br />
                </div>
            </div>
            <div className="flex flex-column flex-center">
                <br />
            {itemsInCartArray.length > 0 && <button className='primary-btn' onClick={makeOrder}>Potvrda narudzbine</button>}
            </div>
            
    </div>
}

export default CartPage;