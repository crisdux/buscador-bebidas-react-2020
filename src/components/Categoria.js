import React from 'react';

const Categoria = ({categoria}) => {
    const {strCategory} = categoria;
    return (
        <>
            <option>{strCategory}</option>
        </>
    );
}

export default Categoria;
