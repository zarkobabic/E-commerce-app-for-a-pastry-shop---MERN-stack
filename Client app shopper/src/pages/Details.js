import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderWithMenu from "../components/HeaderWithMenu";
import classes from './Details.module.css';
import CommentContainer from "../components/CommentContainer";
import {useDispatch} from 'react-redux';
import {add} from '../redux/store/cartSlice';


function DetailsPage(props) {
  const { index } = useParams();

  //lokalno stanje komponente van reduxa
  const [inputQuantityForCart, setInputQuantityForCart] = useState();
  const [quantitySuccessMessage, setQuantitySuccessMessage] = useState(false);
  const [quantityFailedMessage, setQuantityFailedMessage] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [product, setProduct] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [edited, setEdited] = useState(false);


  useEffect(() => {
    async function fetchProduct() {
        const resultInJSON = await fetch("http://localhost:4000/api/v1/" + props.type +  "s/" + index);
        const resultInJSObject = await resultInJSON.json();
        setProduct(resultInJSObject.chosenProduct);
        setLoaded(true)
    }
    fetchProduct();
}, [edited]);

  //redux dispatching acctions for shopping cart
  const dispatch = useDispatch();

  const formAddToCart = (event, product) => {
    //dispatch add action
    event.preventDefault();

    if(inputQuantityForCart <= 0){
      setQuantityFailedMessage(true);
      setTimeout(setQuantityFailedMessage, 1400, false);
      return;
    }

    dispatch(add({...product, 'quantity': inputQuantityForCart}));
    setQuantitySuccessMessage(true);
    setInputQuantityForCart("");
    setTimeout(setQuantitySuccessMessage, 1400, false);
  }

  const handleCartQuantityInput = (event) => {
    setQuantityFailedMessage(false);
    setQuantitySuccessMessage(false);
    setInputQuantityForCart(event.target.value)
  }

  const handleAddComment = (event) =>{

    event.preventDefault();
    fetch("http://localhost:4000/api/v1/" + props.type + "s/addCommentToProduct", {
        method: 'POST',
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ idProduct: product.idProduct , userName: localStorage.getItem("loggedUser"), commentDescription: commentText})
    }).then(res=>{
      setEdited(true);
      setTimeout(setEdited, 10, false);
      setCommentText("");
    })
  }

  const handleCommentTextChange = (event) =>{
    setCommentText(event.target.value);
  }


  return (
    <div>
      <HeaderWithMenu />
      <div className="title-underscore flex flex-column flex-center">
        <div>
            <h1 className={classes.centeredText}>Detaljan pregled <br />proizvoda</h1>
            <br />
            <hr />
        </div>
        <br />
        <br />
        <div className={"flex flex-row flex-center " + classes.detailsContainer}>
          <div className={"flex flex-column flex-center " + classes.detailsLeft}>
            <img src={"/images/img-" + props.type + "s/" +  product.image} alt=""></img>
            <div className="flex flex-center">
              <h4>{product.title}</h4>
            </div>
          </div>
          <div className={"flex flex-row " + classes.detailsRight}>
            <div className={classes.detailsDescription}>
              <h3 className={classes.redColor}>Opis</h3>
              <hr />
              <p>{product.description}</p>
            </div>
            <div className={"flex flex-column " + classes.detailsComposition}>
              <div>
                <h3 className={classes.whiteColor}>Sastav</h3>
                <hr />
                <p className={classes.whiteColor}>
                  {loaded && <ul>
                    {product.composition.map((item, index)=>{
                      return(
                        <li key={index}>{item}</li>
                      )
                    })}
                  </ul>}
                </p>
              </div>
              <div className={"flex flex-column " + classes.detailsCompositionRightAligned}>
                <h3>Cena</h3>
                <hr />
                <p className={classes.whiteColor}> {product.price}</p>
              </div>
            </div>
          </div>
        </div>
  
      </div>
      <br />
      <br />
      <div>
        <form className={"flex flex-row " + classes.detailsForm} onSubmit={(event) => formAddToCart(event, product)}>
            <input type="number" placeholder="Unesite kolicinu" id='quantity' value={inputQuantityForCart} onChange={handleCartQuantityInput} required></input>
            <button className='primary-btn'>Dodaj u korpu</button>
            {/* treba da se renderuje u zavisnosti od stanja koje nam prikazuje uspesnost  */}
            {quantitySuccessMessage && <div className={classes.notificationSuccess}>Uspesno dodato u korpu!</div>}
            {quantityFailedMessage && <div className={classes.notificationFailed}>Greska prilikom dodavanja u korpu, pokusajte ponovo!</div>}
        </form>
      </div>
      
      
      <br />
      <br />
      
      
      <div className="flex flex-center flex-column">
        <hr className="underscore-delimiter" />
        <h1 className={classes.centeredText + " " + classes.whiteColor}>Sta ostali misle?</h1>
        <br />
        <br />
        
        {loaded && product.comments.length != 0 && product.comments.map((comment, index)=>{
          return(
            <CommentContainer key={index} commentObj={comment} />
          )
        })}

        {loaded && product.comments.length ==0 && <div>Nažalost, i dalje ne postoje komentari za ovaj proizvod</div>}
      
      </div>

      <br />


      <div className="flex flex-center flex-column">
        <hr className="underscore-delimiter" />
        <h1 className={classes.centeredText + " " + classes.whiteColor}>Podelite Vase iskustvo sa nama</h1>
        <br />
        <br />
        <div className={"flex flex-center flex-column " + classes.commentFormContainer}>
          <div className={"flex flex-column flex-center " + classes.commentFormTitle}>
            <h1 className={classes.whiteColor}>Ostavite komentar:</h1>
          </div>
          <div className={classes.commentFormBody}>
            <form className={"flex flex-column flex-center "} onSubmit = {handleAddComment}>
              <div className={"flex flex-center flex-column " + classes.commentTextContainer}>
                <textarea placeholder="Unesite komentar" id='commentText' onChange={handleCommentTextChange} value={commentText} required></textarea>
              </div>
              <div className={"flex flex-center flex-column " + classes.commentButtonContainer}>
                <button className='primary-btn'>Unesi komentar</button>
              </div>
            </form>
          </div>
        </div>
      
      </div>




      
    </div>
  );



}

export default DetailsPage;