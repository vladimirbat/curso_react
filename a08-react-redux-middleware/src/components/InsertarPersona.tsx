import React, {ChangeEvent, Component} from 'react';
import { Persona } from '../js/Persona';

// --------------- PRESENTACIÓN --------------
interface InsertarProps {
    insertar:(p:Persona)=>void
}

export class InsertarPersona extends Component<InsertarProps,{persona:Persona}>{
    constructor(props:InsertarProps){
        super(props);
        this.cambio = this.cambio.bind(this);
        this.state = {
            persona:{dni:0 ,nombre:'',apellidos:'',saldo:0 }
        };
          
    }
    cambio(event:ChangeEvent<HTMLInputElement>){
        const {persona} = this.state;
        const name:string = event.currentTarget.name;
        if('dni'===name){
            persona[name] = parseInt(event.currentTarget.value);
        } else if('saldo'=== name) {
            persona[name] = parseFloat( event.currentTarget.value);
        } else if('nombre'=== name|| 'apellidos' === name) {
            persona[name] = event.currentTarget.value;
        }
        this.setState({persona});

    }
    render(){
        const {insertar} = this.props;
        const {persona} = this.state;
        return (<div className="panel">
            dni <input type="text" name="dni" value={isNaN(persona.dni)?'':persona.dni}
                    onChange={this.cambio} /><br/>
            nombre <input type="text" name="nombre" value={persona.nombre}
                    onChange={this.cambio}/><br/>
            apellidos <input type="text" name="apellidos" value={persona.apellidos}
                    onChange={this.cambio}/><br/>
            saldo <input type="text" name="saldo" value={isNaN(persona.saldo)?'':persona.saldo}
                    onChange={this.cambio}/><br/>
            <p className="botones">
                <button onClick={() =>insertar(persona)}>
                    Insertar</button></p>
        </div>);
    }

}