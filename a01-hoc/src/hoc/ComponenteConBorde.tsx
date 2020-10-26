import React, {Component} from 'react';
import { withWindowInnerSize } from './withWindowInnerSize';

type WindowSizeProps = {
    innerWidth: number,
    innerHeight: number
}


export class ComponenteConBorde extends Component<WindowSizeProps, {}> {
    constructor(props: WindowSizeProps) {
        super(props);
        console.log(props)
    }
    componentDidUpdate(){
        console.log('update', this.props);
    }
    render() {
        const {innerWidth, innerHeight} = this.props;
        const estilo = {
            border: '1px solid black',
            margin: '25px auto',
            backgroundColor: 'blue',
            width: Math.floor(innerWidth/2),
            height: Math.floor(innerHeight/2)
        }
        return <div style={estilo}></div>;
    }
}

export const ComponenteConBordeWithWindowInnerSize = withWindowInnerSize(ComponenteConBorde)