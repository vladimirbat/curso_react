import React, {FC} from 'react';

export const Home:FC<{color:any}> = ({color}) => {
    return <h2 style={{backgroundColor: color}}>Página principal</h2>;
};
