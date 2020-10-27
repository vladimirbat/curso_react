import React, {Component} from 'react';
import '../estilos.css';
import { TablaPersonasConectada } from './TablaPersonas';
// import {Persona } from '../js/matriz_personas';
import { InsertarPersonaConectada } from './InsertarPersona';
// -------------- CONTENEDOR ----------------
// -- Trabaja directamente con redux
export class Principal extends Component<{},{}>{
    // constructor(props:{}){
        //     super(props);
        
        // }
    render(){
        return  (
            <div>
                <InsertarPersonaConectada/>
                <TablaPersonasConectada/>
            </div>
        );
    }

    // componentDidMount() {
    //     store.subscribe(()=>this.forceUpdate());
    // }

}