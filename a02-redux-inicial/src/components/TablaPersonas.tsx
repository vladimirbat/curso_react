import React, {Component} from 'react';
import '../estilos.css';
import { Persona } from '../js/matriz_personas';

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
                    (<tr>
                        <td>{p.dni}</td>
                        <td>{p.nombre}</td>
                        <td>{p.apellidos}</td>
                        <td>{p.saldo}</td>
                        <td><button onClick={(ev)=>borrarPersona(p.dni)}>&times;</button></td>
                    </tr>)
                )}
            </tbody>
        </table>);
    }

}