import React from "react";
import "../../css/style.css";
class InputReg extends React.Component {
  
  render() {
    return (
      <>
        <label className="Registr">{this.props.labelText}</label>
        <input
          className="Registr"
          id={this.props.for}
          placeholder={this.props.placeholder}
          name={this.props.for}
          type={this.props.type}
          required
        ></input>
      </>
    );
  }
}

export default InputReg;
