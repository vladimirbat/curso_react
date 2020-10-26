import React, {Component} from 'react';
import '../estilos.css';
import { TablaPersonas } from './TablaPersonas';
// import {Persona } from '../js/matriz_personas';
import {createBorrarAction, createInsertarAction, store} from '../js/store-creator';
import { InsertarPersona } from './InsertarPersona';
import { Persona } from '../js/matriz_personas';
// -------------- CONTENEDOR ----------------
// -- Trabaja directamente con redux
export class Principal extends Component<{},{}>{
    // constructor(props:{}){
        //     super(props);
        
        // }
        
    insertar (p:Persona): void {
        store.dispatch(createInsertarAction(p));
    };
    borrarPersona(dni:number) {
        store.dispatch(createBorrarAction(dni));
        console.log('personas',store.getState().personas.length)
    }

    render(){
        const {personas} = store.getState();
        return  (
            <div>
                <InsertarPersona insertar={this.insertar}/>
                <TablaPersonas personas={personas} borrarPersona={this.borrarPersona}/>
            </div>
        );
    }

    componentDidMount() {
        store.subscribe(()=>this.forceUpdate());
    }

}