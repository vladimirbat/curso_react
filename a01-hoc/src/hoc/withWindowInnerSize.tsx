import React, {Component} from 'react';

type WindowSizeProps = {
    innerWidth: number,
    innerHeight: number
}

type WrappedComponentClass = new(wp:WindowSizeProps) => Component<WindowSizeProps | {},{}>;
export const withWindowInnerSize = (WrappedComponent:WrappedComponentClass) => {
    return class extends WrappedComponent{
        constructor(){
            super({innerWidth:50,innerHeight:50});
            const {innerWidth,innerHeight} = window;
            this.state = {innerWidth,innerHeight};
            this.handleResize = this.handleResize.bind(this);
        }
        componentDidMount(){
            window.addEventListener('resize', this.handleResize);
        }
        handleResize() {
            const {innerWidth,innerHeight} = window;
            this.setState({innerWidth,innerHeight});
        }
        render(){
            return <WrappedComponent {...this.props} {...this.state} />
        }
    }
};

