import React, {Component} from 'react';
import '../estilos.css';
import { TablaPersonas } from './TablaPersonas';
// import {Persona } from '../js/matriz_personas';
import {createBorrarAction, createInsertarAction, PersonasAction, StateInterface} from '../js/store-creator';
import { InsertarPersona } from './InsertarPersona';
import { Persona } from '../js/matriz_personas';
import { connect } from 'react-redux';

type OnlyProps = {
    personas: Persona[]
}
type OnlyEvents = {
    insertar: (p:Persona)=>void,
    borrar: (dni:number) => void
}
type PrincipalProps = OnlyProps & OnlyEvents;
// -------------- CONTENEDOR ----------------
// -- Trabaja directamente con redux en su versión PrincipalConectada
export class Principal extends Component<PrincipalProps,{}>{
       
    render(){
        const {personas,insertar,borrar} = this.props;
        return  (
            <div>
                <InsertarPersona insertar={insertar}/>
                <TablaPersonas personas={personas} borrarPersona={borrar}/>
            </div>
        );
    }
}



function mapeoEstadoAProps(state:StateInterface): OnlyProps {
    return {
        personas: state.personas
    };
}

function mapeoEventosADispatcher(dispatch: (action: PersonasAction) => void): OnlyEvents {
    return {
        insertar: (p:Persona) =>dispatch(createInsertarAction(p)),
        borrar: (dni:number)=> dispatch(createBorrarAction(dni)),
    };
}
export const PrincipalConectado = connect(mapeoEstadoAProps, 
    mapeoEventosADispatcher)(Principal);