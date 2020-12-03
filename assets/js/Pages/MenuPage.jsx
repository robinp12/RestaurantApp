import React from 'react';
import Header from '../Components/Header';
import Menu from '../Components/Menu';

const MenuPage = ({ lang }) => {
    return (
        <>
            <h2 className="card-title"><Header title={lang.theMenu} /></h2>
            <Menu />
        </>
    );
}

export default MenuPage;