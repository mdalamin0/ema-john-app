import React, { useContext } from 'react';
import logo from '../../images/Logo.svg'
import './Header.css'
import { Link } from 'react-router-dom';
import ActiveLink from '../ActiveLink/ActiveLink';
import { AuthContext } from '../Providers/AuthProvider';

const Header = () => {
    const {user, logOut} = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
        .then(result => {})
        .catch(error => {console.log(error)})
    }
    return (
        <nav className='header'>
            <img src= {logo} alt="" />
            <div>
                <ActiveLink to="/">Shop</ActiveLink>
                <ActiveLink to="/orders">Orders</ActiveLink>
                <ActiveLink to="/inventory">Manage Inventory</ActiveLink>
                <ActiveLink to="/login">Login</ActiveLink>
                <ActiveLink to="/sign-up">Sign Up</ActiveLink>
                {user && <> <span className='text-white'> {user.email} </span> <button onClick={handleLogOut} >Log Out</button> </>}
            </div>
        </nav>
    );
};

export default Header;