import {Action, createStore} from 'redux';
import { matriz_personas, Persona } from './matriz_personas';
export interface StateInterface {
    personas: Persona[];
}

const estadoEnSession: string | null = sessionStorage.getItem('ESTADO')
const estadoInicial: StateInterface = estadoEnSession ? JSON.parse(estadoEnSession) : {personas: matriz_personas};

const BORRAR = 'BORRAR';
interface BorrarAction extends Action {
    type: typeof BORRAR;
    payload: number;
}
export function createBorrarAction(dni:number):BorrarAction {
    return {type:BORRAR, payload: dni};
}

const INSERTAR = 'INSERTAR';
interface InsertarAction extends Action{
    type: typeof INSERTAR;
    payload: Persona;
}
export function createInsertarAction(persona:Persona):InsertarAction {
    return {type:INSERTAR, payload: persona};
}

export type PersonasAction = BorrarAction | InsertarAction;

function reductorPrincipal(estado:StateInterface=estadoInicial, accion:PersonasAction):StateInterface {
    if(accion.type===BORRAR){
        return {
            personas: estado.personas.filter(p => p.dni !== accion.payload)
        }
    } else if(accion.type===INSERTAR){
        return {
            personas: [...estado.personas, accion.payload]
        }
    }
    return {...estado};
}

// Objeto que contiene todos los datos compartidos de la aplicación.
const wd:any = window;
export const store = createStore(reductorPrincipal, wd.__REDUX_DEVTOOLS_EXTENSION__ && wd.__REDUX_DEVTOOLS_EXTENSION__());
store.subscribe(()=> sessionStorage.setItem('ESTADO', JSON.stringify(store.getState())));