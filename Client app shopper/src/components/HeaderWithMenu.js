
import { Link } from 'react-router-dom';
import classes from './HeaderWithMenu.module.css';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';


function HeaderWithMenu(){

    const navigate = useNavigate();
    const numProductsInCart = useSelector(state => state.cart.length);
    const handleLogout = (event) => {
        localStorage.clear();
        navigate('/');
    }


    return(
        <div className='flex flex-column gap10'>
            <div className={'flex flex-row ' + classes.headerMenu}>
                <Link to="/main"><img src="/images/logo.png" alt="" /></Link>
                
                <ul className={"flex flex-row flex-center " + classes.listNoStyle}>
                    <Link to="/all-cookies"><li>Kolaci</li></Link>
                    <Link to="/all-cakes"><li>Torte</li></Link>
                    <Link to="/personal-data"><li>Licni podaci</li></Link>
                    <Link to="/update-password"><li>Izmena lozinke</li></Link>
                    <Link to="/contact"><li>Kontakt</li></Link>
                    <Link to="/notifications"><li><svg xmlns="http://www.w3.org/2000/svg" width="42" height="48" viewBox="0 0 42 48" fill="none">
                        <path d="M21 48C24.3112 48 26.9972 45.3141 26.9972 42H15.0028C15.0028 45.3141 17.6888 48 21 48ZM41.1928 33.9647C39.3815 32.0184 35.9925 29.0906 35.9925 19.5C35.9925 12.2156 30.885 6.38438 23.9981 4.95375V3C23.9981 1.34344 22.6556 0 21 0C19.3444 0 18.0019 1.34344 18.0019 3V4.95375C11.115 6.38438 6.00755 12.2156 6.00755 19.5C6.00755 29.0906 2.61849 32.0184 0.80725 33.9647C0.244752 34.5694 -0.00462267 35.2922 6.48174e-05 36C0.0103773 37.5375 1.21694 39 3.00943 39H38.9906C40.7831 39 41.9906 37.5375 41.9999 36C42.0046 35.2922 41.7553 34.5684 41.1928 33.9647Z" fill="black" fillOpacity="0.75"/>
                    </svg></li></Link>
                    <Link to="/cart"><li><svg xmlns="http://www.w3.org/2000/svg" width="55" height="44" viewBox="0 0 55 44" fill="none">
                        <path d="M55 18.1609V19.6966C55 20.9688 53.974 22.0001 52.7083 22.0001H51.9444L49.451 39.5444C49.1285 41.8141 47.1947 43.5 44.9138 43.5H10.0862C7.80532 43.5 5.87154 41.8141 5.54889 39.5444L3.05556 22.0001H2.29167C1.026 22.0001 0 20.9688 0 19.6966V18.1609C0 16.8886 1.026 15.8573 2.29167 15.8573H8.7218L18.9178 1.76521C19.9104 0.393445 21.8213 0.0900467 23.1861 1.08777C24.5509 2.0855 24.8526 4.00638 23.8601 5.37825L16.2782 15.8573H38.7218L31.1399 5.37815C30.1474 4.00638 30.4492 2.08541 31.814 1.08768C33.1786 0.0899508 35.0897 0.393253 36.0823 1.76512L46.2782 15.8573H52.7083C53.974 15.8573 55 16.8886 55 18.1609ZM29.7917 35.0536V24.3037C29.7917 23.0315 28.7657 22.0001 27.5 22.0001C26.2343 22.0001 25.2083 23.0315 25.2083 24.3037V35.0536C25.2083 36.3259 26.2343 37.3572 27.5 37.3572C28.7657 37.3572 29.7917 36.3259 29.7917 35.0536ZM40.4861 35.0536V24.3037C40.4861 23.0315 39.4601 22.0001 38.1944 22.0001C36.9288 22.0001 35.9028 23.0315 35.9028 24.3037V35.0536C35.9028 36.3259 36.9288 37.3572 38.1944 37.3572C39.4601 37.3572 40.4861 36.3259 40.4861 35.0536ZM19.0972 35.0536V24.3037C19.0972 23.0315 18.0712 22.0001 16.8056 22.0001C15.5399 22.0001 14.5139 23.0315 14.5139 24.3037V35.0536C14.5139 36.3259 15.5399 37.3572 16.8056 37.3572C18.0712 37.3572 19.0972 36.3259 19.0972 35.0536Z" fill="#E1515A"/>
                    </svg><span className={classes.superscript + " colorRed"}>{numProductsInCart}</span></li></Link>
                </ul>
            </div>
            <div>
                <h3>{localStorage.getItem('loggedUser')}</h3>
            </div>
            <div>
                <button className='secondary-btn' onClick={(event) => handleLogout()}>Odjavi se</button>
            </div>
            <br/>
        </div>
    ) 
    
}

export default HeaderWithMenu;