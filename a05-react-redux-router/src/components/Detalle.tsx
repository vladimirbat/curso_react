import React,{ Component } from 'react';
import {connect} from 'react-redux';
import { Persona } from '../js/matriz_personas';
import { StateInterface } from '../js/store-creator';
// --------------- PRESENTACIÓN --------------
type Props = {
    personas: Persona[], 
    match: {
        params: {dni:string},
        url:string
    }
}
class Detalle extends Component<Props, {persona:Persona}>{
    constructor(props:Props) {
        super(props);
        // const dni = this.props.match.params.dni;
        const {personas, match: {params: {dni}}} = this.props;
        const persona = personas.find((p) => p.dni === parseInt(dni));
        if(persona) {
            this.state = {persona};
        }
    }

    render(){
        const {persona} = this.state;
        return (
            <div>
                <h1>Detalle de la persona con dni {persona && persona.dni}</h1>
                <h2>Url cargada {this.props.match.url}</h2>
                <table>
                    <thead>
                        <tr><th>DNI</th><th>Nombre</th><th>Apellidos</th>
                            <th>Saldo</th></tr>
                    </thead>
                    <tbody>
                        { persona && <tr>
                            <td>{persona.dni}</td>
                            <td>{persona.nombre}</td>
                            <td>{persona.apellidos}</td>
                            <td>{persona.saldo}</td>
                        </tr>}
                    </tbody>
                </table>
            </div>);
    }
}
function mapeoEstadoAProps(estado:StateInterface){
    return { personas: estado.personas};
}

const DetalleConectado = connect(mapeoEstadoAProps)(Detalle);
export default DetalleConectado;