import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../estilos.css';
import { Persona } from '../js/matriz_personas';
import { createBorrarAction, PersonasAction, StateInterface } from '../js/store-creator';

type TablaPersonaProps = {
    personas: Persona[],
    borrarPersona: (dni:number)=>void
}
// -------------- PRESENTACIÓN ----------------
export class TablaPersonas extends Component<TablaPersonaProps,{}>{
    
    render(){
        const {personas, borrarPersona} = this.props;
        return  (<table>
            <thead>
                <tr><th>DNI</th><th>Nombre</th><th>Apellidos</th><th>Saldo</th><th>Acciones</th></tr>
            </thead>
            <tbody>
                {personas.map((p)=>
                    (<tr key={p.dni}>
                        <td>{p.dni}</td>
                        <td>{p.nombre}</td>
                        <td>{p.apellidos}</td>
                        <td>{p.saldo}</td>
                        <td><button onClick={(ev)=>borrarPersona(p.dni)}>&times;</button>
                            <Link to={`/detalle/${p.dni}`}>Detalle</Link>
                        </td>
                    </tr>)
                )}
            </tbody>
        </table>);
    }

}



const mapeoEstadoAProps = (state:StateInterface) => {
    return {
        personas: state.personas
    };
}
const mapeoEventosADispather = (dispatch: (action: PersonasAction) => void) => {
    return {
        borrarPersona: (dni:number)=> dispatch(createBorrarAction(dni)),
    };
}

const TablaPersonasConectada = 
    connect(mapeoEstadoAProps,mapeoEventosADispather)(TablaPersonas);
    
export default TablaPersonasConectada;