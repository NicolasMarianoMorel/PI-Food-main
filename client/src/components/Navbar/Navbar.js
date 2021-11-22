import React from 'react';
import { Outlet } from 'react-router';
import './Navbar.css';
import { Link } from 'react-router-dom';

/* const navigate = useNavigate(); */
export default function NavBar() {
    return (
        <div>
            <h1>Spoonacular Food App</h1>
           {/*  <button onClick={() => navigate("/home")}>Home</button>
            <button onClick={() => navigate("/form")}>Create Recipe</button> */}
            <Link to="/home">Home </Link>
            <Link to="/form"> Create Recipe</Link>
            <Outlet />
        </div>
    )
}