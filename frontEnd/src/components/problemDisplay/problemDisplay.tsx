import React, { Component } from 'react';
import './problemDisplay.css'

interface ComProps {

}

class problemDisplay  extends Component<ComProps> {
    constructor(props: ComProps | Readonly<ComProps>) {
        super(props);
        this.state = {
        };
    }

    handleClick = (e: any) => {
    }

    render() {
        return (
            <div>
                <h1>列表</h1>
            </div>
        )
    }
}

export default problemDisplay;