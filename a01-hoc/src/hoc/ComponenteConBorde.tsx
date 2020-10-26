import React, {Component} from 'react';

type WindowSizeProps = {
    innerWidth: number,
    innerHeight: number
}
type ConBordeState = {
    width: number,
    height: number
}

export class ComponenteConBorde extends Component<WindowSizeProps, ConBordeState > {
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
        return <div style={estilo}></div>
    }
}