import React from 'react';
import Header from '../Components/Header';
import Menu from '../Components/Menu';

const MenuPage = () => {
    return (
        <>
            <h2 className="card-title"><Header title={"La carte"} /></h2>
            <Menu />
        </>
    );
}

export default MenuPage;