import React, {Component, Fragment} from 'react';
import '../estilos.css';
import { TablaPersonasConectada } from './TablaPersonas';
// import {Persona } from '../js/matriz_personas';
import { InsertarPersonaConectada } from './InsertarPersona';
import { Link, Route } from 'react-router-dom';
import { Home } from './Home';
// -------------- CONTENEDOR ----------------
// -- Trabaja directamente con redux
export class Principal extends Component<{},{}>{
    // constructor(props:{}){
        //     super(props);
        
        // }
    render(){
        return  (
            <Fragment>
                <nav>
                    <div>
                        <Link to="/">Home</Link>
                        <Link to="/listado">Listado</Link>
                        <Link to="/insertar">Insertar</Link>
                    </div>
                </nav>
                <div>
                    <Route path="/" exact component={()=><Home color="yellow"/>} />
                    <Route path="/insertar" component={InsertarPersonaConectada} />
                    <Route path="/listado" component={TablaPersonasConectada} />
                </div>
            </Fragment>

        );
    }

    // componentDidMount() {
    //     store.subscribe(()=>this.forceUpdate());
    // }

}