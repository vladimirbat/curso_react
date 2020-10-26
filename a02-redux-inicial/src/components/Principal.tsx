import React, {Component} from 'react';
import '../estilos.css';
import { TablaPersonas } from './TablaPersonas';
import {matriz_personas, Persona } from '../js/matriz_personas';

// -------------- CONTENEDOR ----------------
// -- Trabaja directamente con redux
export class Principal extends Component<{},{personas:Persona[]}>{
    constructor(props:{}){
        super(props);
        this.state = {personas: [...matriz_personas]};
    }
    render(){
        const {personas} = this.state;
        return  (
            <div>
                <TablaPersonas personas={personas}/>
            </div>
        );
    }

}