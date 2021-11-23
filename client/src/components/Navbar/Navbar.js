import React from 'react';
import { Outlet } from 'react-router';
import { NavLink } from 'react-router-dom';
import style from './Navbar.module.css';

/* const navigate = useNavigate(); */
export default function NavBar() {
    return (
        <div>
            <div className={style.container}>
            <h1 className={style.title}>Henry Food App</h1>
            <NavLink to="/home"><button className={style.btn} >Home</button> </NavLink>
            <NavLink to="/form"> <button className={style.btn}>Create Recipe</button></NavLink>
            </div>
            <Outlet />
        </div>
    )
}