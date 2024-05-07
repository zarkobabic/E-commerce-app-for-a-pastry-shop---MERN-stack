import { useState } from "react";
import HeaderWithMenu from "../components/HeaderWithMenu";
import classes from './AddProductPage.module.css';

function AddProductPage(){

    const [inputData, setInputData] = useState({type: "cake",title: "", description: "", composition: [], price: "", comments: []});
    const [activePicture, setActivePicture] = useState("activePicture1");
    const [activePath, setActivePath] = useState("/images/img-defaultProduct/donut1.png");
    const [compositionText, setCompositionText] = useState("");

    const handleSelectedPicture = (event, selectedPicture, path) =>{
        let lastElement = document.getElementById(activePicture);
        lastElement.classList.remove("activePicture");
        
        let element = document.getElementById(selectedPicture);
        element.classList.add("activePicture");

        setActivePicture(selectedPicture);
        setActivePath(path);
    }


    const handleInputChanged= (event) =>{
        const fieldToChange = event.target.id;
        setInputData({...inputData, [fieldToChange] : event.target.value});
    }

    const preparationForSubmit = (event) => {
        const compositionArray = compositionText.split("\n");
        setInputData({...inputData, "composition": compositionArray, "image" : activePath});
    }

    const handleAddProduct = (event) => {
        event.preventDefault();

        if(inputData.type === "cake"){
            fetch("http://localhost:4000/api/v1/cakes/add",{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ newCakeFromRequest: inputData})
            })
            .then(res=> res.json()).then(data=> {
                if(data.success){
                    setInputData({type: "cake",title: "", description: "", composition: [], price: "", comments: []});
                    handleSelectedPicture(null, "activePicture1", "/images/img-defaultProduct/donut1.png");
                    setCompositionText("");
                }
            })
        }
        else if(inputData.type === "cookie"){
            fetch("http://localhost:4000/api/v1/cookies/add",{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ newCookieFromRequest: inputData})
            })
            .then(res=> res.json()).then(data=> {
                if(data.success){
                    setInputData({type: "cake",title: "", description: "", composition: [], price: "", comments: []});
                    handleSelectedPicture(null, "activePicture1", "/images/img-defaultProduct/donut1.png");
                    setCompositionText("");
                }
            })
        }
    }

    const handleCompositionChanged = (event) =>{
        setCompositionText(event.target.value);
    }

    return <div>
        <HeaderWithMenu />
        <div className="title-underscore flex flex-column flex-center">
            <div>
                <h1>Dodavanje proizvoda</h1>
                <hr />
            </div>
        </div>
        <br />
        <br />
        <br />
        <br />

        <form onSubmit={handleAddProduct}>
            <div className={"flex flex-row " + classes.dataInput}>
                <div>
                    <div>
                        <h4>Naziv</h4>
                        <input type="text" id='title' required placeholder="Unesite naziv proizvoda" value={inputData.title} onChange={handleInputChanged}></input>
                    </div>
                    <div>
                        <h4>Tip proizvoda</h4>
                        <select id="type" required value={inputData.type} onChange={handleInputChanged}>
                            <option value= "cake">Torta</option>
                            <option value = "cookie">Kolac</option>
                        </select>
                    </div>
                    <div>
                        <h4>Cena</h4>
                        <input type="text" id='price' required placeholder="Unesite cenu proizvoda" value={inputData.price} onChange={handleInputChanged}></input>
                    </div>
                </div>
                <div className="flex flex-column">
                    <h4>Sastav</h4>
                    <textarea placeholder="Unesite sastojke, svaki u posebnom redu" id='composition' onChange={handleCompositionChanged} value={compositionText}></textarea>
                </div>
            </div>

            <br />
            <br />

            <div className={"flex flex-row " + classes.dataInput}>
                <div>
                    <h4 className={classes.colorWhite}>Slika</h4>
                    <div className="flex flex-column gap10">
                        <div className="flex flex-row gap10">
                            <div className={classes.defaultImageContainer + " activePicture"} id="activePicture1" onClick={(event) => handleSelectedPicture(event, "activePicture1", "../img-defaultProduct/donut1.png")}>
                                    <img src="/images/img-defaultProduct/donut1.png" alt=""></img>
                            </div>
                            <div  className={classes.defaultImageContainer  + " " + classes.upRight} id="activePicture2" onClick={(event) => handleSelectedPicture(event, "activePicture2", "../img-defaultProduct/donut2.png")}>
                                <img src="/images/img-defaultProduct/donut2.png" alt=""></img>
                            </div>
                        </div>
                        <div className="flex flex-row gap10">
                            <div className={classes.defaultImageContainer  + " " + classes.downLeft} id="activePicture3" onClick={(event) => handleSelectedPicture(event, "activePicture3", "../img-defaultProduct/donut3.png")}>
                                <img src="/images/img-defaultProduct/donut3.png" alt=""></img>
                            </div>
                            <div className={classes.defaultImageContainer  + " " + classes.downRight} id="activePicture4" onClick={(event) => handleSelectedPicture(event, "activePicture4", "../img-defaultProduct/donut4.png")}>
                                <img src="/images/img-defaultProduct/donut4.png" alt=""></img>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-column">
                    <h4 className={classes.colorWhite}>Opis</h4>
                    <textarea placeholder="Unesite opis proizvoda" id='description' value={inputData.description} required onChange={handleInputChanged}></textarea>
                </div>
            </div>
            <br />
            <br />
            <br />
            <div className="flex flex-justify-content-center flex-row">
            <button className={'primary-btn ' + classes.actionButton} onClick={preparationForSubmit}>Dodaj proizvod</button>
            </div>
        </form>


    </div>
}

export default AddProductPage;