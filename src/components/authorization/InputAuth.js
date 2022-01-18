import React from 'react';
import '../../css/style.css';
class InputAuth extends React.Component {
    render() { 
        return <>
            <label className="Auth">{this.props.labelText}</label>
            <input className="Auth" placeholder={this.props.placeholder} name={this.props.for} type={this.props.type} required id={this.props.for}></input>
        </>;
    }
}
 
export default InputAuth;