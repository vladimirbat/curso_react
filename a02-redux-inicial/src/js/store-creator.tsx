import {createStore} from 'redux';
import { matriz_personas, Persona } from './matriz_personas';
export interface StateInterface {
    personas: Persona[];
}
const estadoInicial: StateInterface = {
    personas: matriz_personas
}

function reductorPrincipal(estado:StateInterface=estadoInicial, accion:any):StateInterface {
    return {...estado};
}

// Objeto que contiene todos los datos compartidos de la aplicación.
export const store = createStore(reductorPrincipal);