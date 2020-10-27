import React, {Component} from 'react';
import '../estilos.css';
import { TablaPersonas } from './TablaPersonas';
// import {Persona } from '../js/matriz_personas';
import {fetchDeleteAction, fetchInsertAction, StateInterface} from '../js/store-creator';
import { InsertarPersona } from './InsertarPersona';
import { Persona } from '../js/Persona';
import { connect } from 'react-redux';
import { fetchPersonasAction} from '../js/store-creator';

type OnlyProps = {
    personas: Persona[]
}
type OnlyEvents = {
    buscarPersonas: ()=>void,
    insertar: (p:Persona)=>void,
    borrar: (dni:number) => void
}
type PrincipalProps = OnlyProps & OnlyEvents;
// -------------- CONTENEDOR ----------------
// -- Trabaja directamente con redux en su versión PrincipalConectada
export class Principal extends Component<PrincipalProps,{}>{
    constructor(props: PrincipalProps){
        super(props);
        this.props.buscarPersonas();
    }
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

function mapeoEventosADispatcher(dispatch: any): OnlyEvents {
    return {
        buscarPersonas: () => dispatch(fetchPersonasAction()),
        insertar: (p:Persona) =>dispatch(fetchInsertAction(p)),
        borrar: (dni:number)=> dispatch(fetchDeleteAction(dni)),
    };
}
export const PrincipalConectado = connect(mapeoEstadoAProps, 
    mapeoEventosADispatcher)(Principal);