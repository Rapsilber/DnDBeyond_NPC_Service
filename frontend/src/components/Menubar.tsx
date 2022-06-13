import React from 'react';
import {useLocation} from 'react-router-dom'

import {
    useNavigate,
} from 'react-router-dom';

import Button from "./Button";

import '../scss/Menubar.css';

const Menubar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const homePage = (e:any) => {
        e.preventDefault();
        if(location.pathname === "/") {
            window.location.reload();
        }
        else{
            navigate("/");
        }
    }

    return (
        <div className="menubar">
            <Button className="homePage-button" onClick={homePage} />
        </div>
    );
}

export default Menubar;