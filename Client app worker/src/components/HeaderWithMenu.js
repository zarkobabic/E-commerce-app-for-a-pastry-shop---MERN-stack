
import { Link } from 'react-router-dom';
import classes from './HeaderWithMenu.module.css';
import {useNavigate} from 'react-router-dom';


function HeaderWithMenu(){

    const navigate = useNavigate();
    const handleLogout = (event) => {
        localStorage.clear();
        navigate('/');
    }


    return(
        <div className='flex flex-column gap10'>
            <div className={'flex flex-row ' + classes.headerMenu}>
                <Link to="/requests"><img src="/images/logo.png" alt="" /></Link>
                
                <ul className={"flex flex-row flex-center " + classes.listNoStyle}>
                    <Link to="/requests"><li>Zahtevi za narudzbine</li></Link>
                    <Link to="/add-product"><li>Dodavanje proizvoda</li></Link>
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