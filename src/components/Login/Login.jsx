import React, { useContext, useState } from 'react';
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const Login = () => {
    const { signInUser, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate()
    const location = useLocation();
    const [passwordType, setPasswordType] = useState('password');
    const from = location.state?.from?.pathname || '/';
    const handleSignIn = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signInUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                alert('login success')
                form.reset()
                navigate(from, {replace: true})
            })
            .catch(error => {
                alert(error.message)
            })
    }

    const handleSignInWithGoogle = () => {
        signInWithGoogle()
            .then(result => {
                const loggedUser = result.user;
                alert('success')

            })
            .catch(error => {
                alert(error.message)
            })
    }

    const handleShowHidePass = () => {
        if(passwordType === 'password'){
            setPasswordType('text')
        }
        else if (passwordType === 'text'){
            setPasswordType('password')
        }
    }
    return (
        <form onSubmit={handleSignIn} className='form-container'>
            <h4 className='form-title'>Login</h4>
            <div className='form-control'>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="" required />
            </div>
            <div className='form-control'>
                <label htmlFor="password">Password</label>
                <input type= {passwordType} name="password" id="" required />
                <p onClick={handleShowHidePass} className='show-pass-btn'>{passwordType === 'password' ? <span>show password</span> : 'hide password'}</p>
            </div>
            <input className='btn-submit' type="submit" value="Login" />

            <p className='new-account-link'>New to Ema-john? <Link to='/sign-up'>  <span className='link'>Create New Account</span></Link></p>

            <div className=" google-btn-container">
                <button onClick={handleSignInWithGoogle} className="google-btn "> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png" alt="" /> Continue with Google</button>
            </div>
        </form>
    );
};

export default Login;