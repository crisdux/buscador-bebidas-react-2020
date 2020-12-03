import React,{useContext, useState} from 'react'
import {CategoriasContext} from '../context/CategoriasContext';
import {RecetasContext} from '../context/RecetasContext';
import Categoria from './Categoria';
export default function Formulario() {

    //state local de este componente
    const [busqueda, guardarBusqueda] = useState({
        //propiedad name del input y del select
        nombre:'',
        categoria:''
    });

    const {categorias} = useContext(CategoriasContext); //nos llega el array de categorias via context
    const {buscarRecetas,guardarConsultar} = useContext(RecetasContext); //useContext recibe siempre un context creado

    const obtenerDatosReceta = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        });
    }
    
    return (
        <form className="col-12" onSubmit={e =>{
            e.preventDefault();
            buscarRecetas(busqueda);
            guardarConsultar(true); //cuando le doy click al button rencian llama a la api
        } }>
           <fieldset className="text-center">
               <legend>Buscar bebidas por categoria o ingrediente</legend>
           </fieldset> 

           <div className="row mt-4">
                <div className="col-md-4">
                    <input type="text"
                        name="nombre"
                        className="form-control"
                        placeholder="Buscar por ingrediente..."
                        onChange={obtenerDatosReceta}
                    />
                </div>

                <div className="col-md-4">
                    <select className="form-control" name="categoria" onChange={obtenerDatosReceta}>
                        {categorias.map(categoria => (
                            <Categoria  key={categoria.strCategory} categoria={categoria}/>
                        ))}
                    </select>
                </div>

                <div className="col-md-4">
                    <input type="submit"
                        className="btn bt-block btn-primary"
                        value="Buscar bebida"
                    />
                </div>
           </div>
        </form>
    )
}
