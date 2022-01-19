import React from "react";
import "../../../dist/css/style.css";
import { API } from "../../API/API.js";
import { url } from "../../../config";
import InputForm from "../InputForm";
const api = new API(url);

class Authorization extends React.Component {
  constructor() {
    super();

    this.state = {
      nickname: "",
      password: "",
    };
  }
  handleFormSubmit = async () => {
    const nickname = this.state.nickname;
    const password = this.state.nickname;

    if (nickname.trim() !== "" || password.trim() !== "") {
      const callAPI = await api.callAPI("authorization", "POST", "", {
        nickname: nickname.trim(),
        password: password.trim(),
      });

      document.cookie = `token=${await callAPI.text()}`;
      if (this.props.token === "You need registration!") {
        alert("User not found. May be, you need registration");
      } else {
        window.location.reload();
      }
    }
  };
  getDataInput = (value, nameInput) => {
    if (nameInput === "nickname") {
      this.setState({ nickname: value });
    } else if (nameInput === "password") {
      this.setState({ password: value });
    }
  };
  render() {
    return (
      <>
        <form
          className="Auth"
          onSubmit={(event) => {
            event.preventDefault();
          }}>
          <h2>Authorizatoin</h2>
          <InputForm
            type={"text"}
            placeholder={"Write your nickname"}
            forInput={"nickname"}
            labelText={"Nickname"}
            fun={this.getDataInput}
            style={"Auth"}
          />
          <InputForm
            type={"password"}
            placeholder={"Write your password"}
            forInput={"password"}
            labelText={"Password"}
            fun={this.getDataInput}
            style={"Auth"}
          />
          <button className="Auth" onClick={this.handleFormSubmit}>
            Send
          </button>
        </form>
      </>
    );
  }
}

export default Authorization;
