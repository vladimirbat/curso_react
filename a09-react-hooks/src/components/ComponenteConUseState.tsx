import React, {FC, useRef, MouseEvent, useState, Fragment} from 'react';

export const ComponenteConUseState:FC<{}> = () =>{
    const nombreRef = useRef<HTMLInputElement>(null);
    const [lista, setLista] = useState<string[]>([]);

    function guardar(event:MouseEvent<HTMLButtonElement>){
        setLista([...lista,nombreRef.current!.value])
    }

    return (
        <Fragment>
            <form onSubmit={event => event.preventDefault()}>
                Nueva:<input type="text" ref={nombreRef} />
                <button onClick={guardar}>Insertar</button>
            </form>
            <table>
                <tbody>
                    {lista.map((nombre,i)=>{
                        return (<tr key={i}>
                            <td>{nombre}</td>
                        </tr>);
                    })}
                </tbody>
            </table>
        </Fragment>
    );
}