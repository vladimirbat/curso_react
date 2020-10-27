import React, {FC, useRef, MouseEvent, useState, Fragment, useEffect, useDebugValue} from 'react';

export const ComponenteConUseEfect:FC<{}> = () =>{
    const [dias, setDias] = useState<string[]>([]);
    // Recibe una función que se ejecuta después del primer renderizado (componentDidMount),
    // después de los siguientes renderizados (se puede eviar estas ejecuciones) (componentDidUpdate)

    // useEffect(()=>{
    //     console.log('useEffect');
    //     if(dias.length===0) {
    //         fetch('laborables.json')
    //             .then((response:Response) => response.json())
    //             .then(x => new Promise<any>((resolve) => setTimeout(() => resolve(x), 2000)))
    //             .then(ds => setDias(ds));
    //     }
    // });
    const textDias = dias.toString();
    useEffect(()=>{
        console.log('useEffect');
        fetch('laborables.json')
            .then((response:Response) => response.json())
            .then(x => new Promise<any>((resolve) => setTimeout(() => resolve(x), 2000)))
            .then(ds => setDias(ds));
    },[textDias]);

    if(dias.length){
        return (<ul>
            {dias.map((d,i) => {
                return <li key={i}>{d}</li>
            })}
        </ul>);
    }
    return <div style={{textAlign:'center'}}>
        <img src="loading.gif" alt="Loading..." style={{width:150, maxWidth:'90%'}}/>
    </div>;
}