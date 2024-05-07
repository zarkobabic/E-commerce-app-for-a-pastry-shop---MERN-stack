
import LoginForm from '../components/LoginForm';
import classes from './Login.module.css';

function LoginPage(){
    return (
        <div>
            <div className={'flex-center flex-row ' + classes.loginHeader}>
                <img src='../../images/logo.png' alt='' />
                <div>
                    <h1>Poslasticarnica</h1>
                    <h1 style={{color: '#D88244'}}>Slatki Zalogaji</h1>
                </div>

            </div>
            <div className={'flex-center flex-row ' + classes.loginHeroSection}>
                <div className={classes.loginFormContainer}>
                    <h1>Prijava na sistem</h1>
                    <br />
                    <LoginForm />
                </div>
                <img src='../../images/rectangle2.png' alt=''/>
            </div>
        </div>
    )
}

export default LoginPage;