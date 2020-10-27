import React, {Component, Fragment, lazy, Suspense} from 'react';
import '../estilos.css';
import { Link, Route } from 'react-router-dom';
import Spinner from './Spinner';

// const Home = lazy(()=> import('./Home')); // Error porque no tiene export default.
const Home = lazy(()=> import('./Home').then((module) => ({ default: module.Home })));
const DetalleConectado = lazy(()=> import('./Detalle'));
const TablaPersonasConectada = lazy(()=> import('./TablaPersonas'));
const InsertarPersonaConectada = lazy(()=> import('./InsertarPersona'));
// -------------- CONTENEDOR ----------------
// -- Trabaja directamente con redux
export class Principal extends Component<{},{}>{
    render(){
        return  (
            <Fragment>
                <nav>
                    <div>
                        <Link to="/">Home</Link>
                        <Link to="/listado">Listado</Link>
                        <Link to="/insertar">Insertar</Link>
                        <Link to="/detalle/22">Detalle 22</Link>
                    </div>
                </nav>
                <div>
                    <Suspense fallback={<Spinner />}>
                        <Route path="/" exact component={()=><Home color="yellow"/>} />
                        <Route path="/insertar" component={InsertarPersonaConectada} />
                        <Route path="/listado" component={TablaPersonasConectada} />
                        <Route path="/detalle/:dni" component={DetalleConectado} />
                    </Suspense>
                </div>
            </Fragment>

        );
    }
}