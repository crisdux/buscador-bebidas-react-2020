import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
//Crear el context : SIEMPRE SE HACE
export const CategoriasContext = createContext();

//Crear un Provider (se encuentran las funciones y el state)
const CategoriasProvider = (props) => {
    //crear state del context 
    const [categorias, guardarCategoria] = useState([]);

    //llamar a la api
    useEffect(() => {
        const obtenerCategorias = async() => {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
            const categorias = await axios.get(url)
            guardarCategoria(categorias.data.drinks); //alamacenamos la respuesta de la api en el state
        }
        obtenerCategorias();
    },[]);

    return (
        // Usamos el context llamando al provider en sintaxis de componente
        <CategoriasContext.Provider
        value={{
            //valores disponibles en todos los componentes
            categorias
        }}>
            {props.children}
        </CategoriasContext.Provider>
    )
}
//expoertamos el Provider simepre
export default CategoriasProvider;