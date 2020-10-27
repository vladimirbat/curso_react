import React, {FC, useState, Fragment} from 'react';

function useConmutador(valorInicial:boolean):[boolean,()=>void] {
    const [valor,setValor] = useState(valorInicial);
    const alternar = () => {setValor(!valor)};
    return [valor,alternar]
}


export const ComponenteConUsePersonalizado:FC<{}> = () =>{
    const [mostrar, conmutar] = useConmutador(true);
    const lista = ['Hola','Adios','Que tal'];

    return (
        <Fragment>
            <button onClick={()=> conmutar()}>Mostrar/ocultar</button>
            {mostrar &&<table>
                <tbody>
                    {lista.map((nombre,i)=>{
                        return (<tr key={i}>
                            <td>{nombre}</td>
                        </tr>);
                    })}
                </tbody>
            </table>}
        </Fragment>
    );
}