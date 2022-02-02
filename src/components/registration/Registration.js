import React from "react";
import InputForm from "../InputForm";
import "../../../dist/css/style.css";
import { API } from "../../API/API";
import { url } from "../../../config/index.js";
import { v4 as uuidv4 } from "uuid";

const api = new API(url);

class Registration extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      surname: "",
      nickname: "",
      password: "",
    };
  }
  handleFormSubmit = async () => {
    const name = this.state.name;
    const surname = this.state.surname;
    const nickname = this.state.nickname;
    const password = this.state.password;

    if (
      name.trim() !== "" ||
      surname.trim() !== "" ||
      nickname.trim() !== "" ||
      password.trim() !== ""
    ) {
      const call = await api.callAPI("api/registration", "POST", "123", {
        name: name.trim(),
        surname: surname.trim(),
        nickname: nickname.trim(),
        password: password.trim(),
        id: uuidv4(),
      });
      document.cookie = `token=${await call.text()}`;
    } else {
      alert("Invalid data. Try another entry.");
    }
    if (document.cookie === "token=This nickname already exists") {
      alert("This nickname already exists. Change it.");
    } else {
      window.location.reload();
    }
  };
  getInputData = (value, nameInput) => {
    if (nameInput === "name") {
      this.setState({ name: value });
    } else if (nameInput === "surname") {
      this.setState({ surname: value });
    } else if (nameInput === "nickname") {
      this.setState({ nickname: value });
    } else if (nameInput === "password") {
      this.setState({ password: value });
    }
  };
  render() {
    return (
      <>
        <form
          className="Registr"
          onSubmit={function (event) {
            event.preventDefault();
          }}
        >
          <h2>Registration</h2>
          <InputForm
            labelText={"Name"}
            placeholder={"Write your name"}
            forInput={"name"}
            type={"text"}
            style={"Registr"}
            fun={this.getInputData}
          />
          <InputForm
            labelText={"Surname"}
            placeholder={"Write your surname"}
            forInput={"surname"}
            type={"text"}
            style={"Registr"}
            fun={this.getInputData}
          />
          <InputForm
            labelText={"Nickname"}
            placeholder={"Write your nickname"}
            forInput={"nickname"}
            type={"text"}
            style={"Registr"}
            fun={this.getInputData}
          />
          <InputForm
            labelText={"Password"}
            placeholder={"Write your password"}
            forInput={"password"}
            type={"password"}
            style={"Registr"}
            fun={this.getInputData}
          />
          <button className="Registr" onClick={this.handleFormSubmit}>
            Send
          </button>
        </form>
      </>
    );
  }
}

export default Registration;
