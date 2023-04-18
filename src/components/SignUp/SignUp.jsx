import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const SignUp = () => {
    const { createUser, signInWithGoogle } = useContext(AuthContext);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirm.value;
        if (password !== confirmPassword) {
            alert('confirm password not match')
            return;
        }
        else {
            createUser(email, password)
                .then(result => {
                    const loggedUser = result.user;
                    alert('success ')
                    form.reset();
                })
                .catch(error => {
                    alert(error.message)
                })
        }

    }

    const handleSignUpWithGoogle = () => {
        signInWithGoogle()
            .then(result => {
                const loggedUser = result.user;
                alert('success')

            })
            .catch(error => {
                alert(error.message)
            })
    }

    return (
        <form onSubmit={handleFormSubmit} className='form-container' style={{ height: '700px' }}>
            <h4 className='form-title'>Sign Up</h4>
            <div className='form-control'>
                <label htmlFor="">Email</label>
                <input type="email" name="email" id="" required />
            </div>
            <div className='form-control'>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="" required />
            </div>
            <div className='form-control'>
                <label htmlFor="password">Confirm Password</label>
                <input type="password" name="confirm" id="" required />
            </div>
            <input className='btn-submit' type="submit" value="Sign Up" />
            <p className='new-account-link'>Already have an account?  <Link to='/login'>  <span className='link'>Login</span></Link></p>

            <div className=" google-btn-container">
                <button onClick={handleSignUpWithGoogle} className="google-btn "> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png" alt="" /> Continue with Google</button>
            </div>
        </form>
    );
};

export default SignUp;