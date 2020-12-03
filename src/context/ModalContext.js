import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
//Crear el context : SIEMPRE SE HACE
export const ModalContext = createContext();

//Crear un Provider (se encuentran las funciones y el state)
const ModalProvider = (props) => {
    //crear state del context 
    const [idreceta, guardarIdReceta] = useState(null);
    const [informacion, guardarReceta] = useState({});
    //na vez que tenemos la receta llamar a la api
    useEffect(() => {
        const obtenerReceta = async () => {
            if(!idreceta) return;
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
            const resultado = await axios.get(url);
            guardarReceta(resultado.data.drinks[0]);
        }
        obtenerReceta();
    },[idreceta]);

    return (
        // Usamos el context llamando al provider en sintaxis de componente
        <ModalContext.Provider
        value={{
            //valores disponibles en todos los componentes
            informacion,
            guardarIdReceta,
            guardarReceta
        }}>
            {props.children}
        </ModalContext.Provider>
    )
}
//expoertamos el Provider simepre
export default ModalProvider;