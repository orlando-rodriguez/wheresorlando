import React from 'react';


const Header = (props) => (
    <header className='Header'>
        <h1 className='brand'>Where's Orlando?</h1>

            <button id='add' onClick={() => props.toggle()}>Add+</button>

    </header>
);

export default Header;
