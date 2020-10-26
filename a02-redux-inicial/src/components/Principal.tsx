import React, {Component} from 'react';
import '../estilos.css';
import { TablaPersonas } from './TablaPersonas';
// import {Persona } from '../js/matriz_personas';
import {createBorrarAction, store} from '../js/store-creator';
// -------------- CONTENEDOR ----------------
// -- Trabaja directamente con redux
export class Principal extends Component<{},{}>{
    // constructor(props:{}){
    //     super(props);
        
    // }

    borrarPersona(dni:number) {
        store.dispatch(createBorrarAction(dni));
        console.log('personas',store.getState().personas.length)
    }

    render(){
        const {personas} = store.getState();
        return  (
            <div>
                <TablaPersonas personas={personas} borrarPersona={this.borrarPersona}/>
            </div>
        );
    }
    
    componentDidMount() {
        store.subscribe(()=>this.forceUpdate());
    }

}