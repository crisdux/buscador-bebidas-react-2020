import React,{useContext, useState} from 'react';
//context
import {ModalContext} from '../context/ModalContext'
//material ui
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { light } from '@material-ui/core/styles/createPalette';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 450,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Receta = ({receta}) => {

    //consfiguar el modal
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    //extraer lo valores del context
    const {informacion,guardarIdReceta, guardarReceta} = useContext(ModalContext);

    //muestra y formatea los ingredientes 
    const mostrarIngredientes = (informacion) => {
        let ingredientes = [];
        for(let i = 1; i<16; i++){
            if(informacion[`strIngredient${i}`]){
                ingredientes.push(
                    <li>{informacion[`strIngredient${i}`] } {informacion[`strMeasure${i}`] }</li>
                )
            }
        }

        return ingredientes;
    }

    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                <h3 className="card-header text-center">{receta.strDrink}</h3>
                <img src={receta.strDrinkThumb} alt={`Imagen de ${receta.strDrink}`}/>

                <div className="card-body">
                    <button className="btn-primary btn-blok"
                            onClick={()=> {
                                guardarIdReceta(receta.idDrink);
                                handleOpen();
                            } }>
                        Ver receta
                    </button>

                    <Modal open={open} 
                            onClose = {() => {
                            guardarIdReceta(null)
                            guardarReceta({})
                            handleClose();
                    }} >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{informacion.strDrink}</h2>
                            <h3 className="mt-4">Instrucciones</h3>
                            <p>
                                {informacion.strInstructions}
                            </p>
                            <img src={informacion.strDrinkThumb} alt={`Imagen: ${informacion.strDrink}`} className="img-fluid my-4"/>

                            <h3>Ingredientes y cantidades</h3>
                            <ul>
                                {mostrarIngredientes(informacion)}
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Receta;
