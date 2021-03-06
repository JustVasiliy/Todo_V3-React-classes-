import React from "react";
import "../../dist/css/style.css";
class InputForm extends React.Component {
  constructor({ placeholder, name, type, labelText, fun, forInput, style }) {
    super();
    this.name = name;
    this.placeholder = placeholder;
    this.type = type;
    this.labelText = labelText;
    this.fun = fun;
    this.forInput = forInput;
    this.style = style;
    this.inputRef = React.createRef();
    this.state = {
      inputValue: "",
    };
  }

  setInputValue = (e) => {
    const { value } = e.target;
    this.setState((prevState) => {
      const newState = {
        inputValue: value,
      };
      this.fun(newState.inputValue, this.inputRef.current.name);
      return newState;
    });
  };

  render() {
    return (
      <>
        <label className={this.style}>{this.labelText} </label>
        <input
          value={this.state.inputValue}
          className={this.style}
          id={this.forInput}
          placeholder={this.placeholder}
          name={this.forInput}
          type={this.type}
          required
          ref={this.inputRef}
          onChange={this.setInputValue}
        ></input>
      </>
    );
  }
}

export default InputForm;
