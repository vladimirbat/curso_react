import {Action, applyMiddleware, compose, createStore} from 'redux';
import { Persona } from './Persona';
import thunk from 'redux-thunk';

// -------------- FETCHS (que serán llamados desde el middleware) ----
function getPersonas():Promise<Persona[]> {
    return fetch('personas').then(
        response => response.json()
    ).catch(() => []);
}
function deletePersona(dni:number):Promise<Persona> {
    return fetch(`personas/${dni}`,{method:'DELETE'}).then(
        response => response.json()
    ).catch(() => {return {}});
}
function insertPersona(nuevo:Persona):Promise<Persona> {
    return fetch(`personas`,{
        method:'POST', 
        body: JSON.stringify(nuevo),
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })}).then(
        response => response.json()
    ).catch(() => {return {}});
}

// -------------- ACCIONES QUE RECIBE DIRECTAMENTE EL REDUCTOR PARA CAMBIAR EL STATE --------------------
export interface StateInterface {
    personas: Persona[];
}

const estadoInicial: StateInterface = {personas:[]};

// const BORRAR = 'BORRAR';
// interface BorrarAction extends Action {
//     type: typeof BORRAR;
//     payload: number;
// }
// export function createBorrarAction(dni:number):BorrarAction {
//     return {type:BORRAR, payload: dni};
// }

// const INSERTAR = 'INSERTAR';
// interface InsertarAction extends Action{
//     type: typeof INSERTAR;
//     payload: Persona;
// }
// export function createInsertarAction(persona:Persona):InsertarAction {
//     return {type:INSERTAR, payload: persona};
// }

const GET = 'GET';
interface GetPersonasAction extends Action{
    type: typeof GET;
    payload: Persona[];
}
export function createGetPersonaAction(personas:Persona[]):GetPersonasAction {
    return {type:GET, payload:personas};
}

// export type PersonasAction = BorrarAction | InsertarAction | GetPersonasAction;
export type PersonasAction = GetPersonasAction;

// -------------------- ACCIONES CON MIDDLEWARE -----------------
export function fetchPersonasAction() {
    return function(dispatch:(accion:PersonasAction)=>void){
        return getPersonas().then(
            personas => dispatch(createGetPersonaAction(personas))
        );
    }
}
export function fetchDeleteAction(dni:number) {
    return function (dispatch:Function) {
        return deletePersona(dni).then(
            () => dispatch(fetchPersonasAction())
        )
    }
}
export function fetchInsertAction(nuevo:Persona) {
    return function (dispatch:Function) {
        return insertPersona(nuevo).then(
            () => dispatch(fetchPersonasAction())
        )
    }
}


// ---------------------- REDUCTOR ----------------------------
function reductorPrincipal(estado:StateInterface=estadoInicial, accion:PersonasAction):StateInterface {
   if(accion.type===GET){
        return {
            personas: [...accion.payload]
        }
    }
    return {...estado};
}

// Objeto que contiene todos los datos compartidos de la aplicación.
const wd:any = window;
export const store = createStore(reductorPrincipal,
    compose(
        applyMiddleware(thunk),
        wd.__REDUX_DEVTOOLS_EXTENSION__ && wd.__REDUX_DEVTOOLS_EXTENSION__()
    )
);
store.subscribe(()=> sessionStorage.setItem('ESTADO', JSON.stringify(store.getState())));