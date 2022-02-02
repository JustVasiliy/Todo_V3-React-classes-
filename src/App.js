import React from "react";
import Authorization from "./components/authorization/Authorization";
import Registration from "./components/registration/Registration";
import MainForm from "./components/todo/MainForm";
import RegistrOrAuth from "./components/RegistrOrAuth";
import { getCookie } from "../config/getCookie.js";
import { TokenContext } from "./service/context";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      token: "",
    };
  }
  static contextType = TokenContext;
  getTokenFromСhildComponent = (token) => {
    this.setState({ token });
  };
  componentDidMount() {
    this.setState({ token: getCookie("token") });
  }
  render() {
    if (
      this.state.token === "Invalid token" ||
      this.state.token === "" ||
      this.state.token === undefined ||
      this.state.token === "error"
    ) {
      return <RegistrOrAuth token={this.state.token} />;
    } else if (this.state.token === "registration") {
      return <Registration token={this.state.token} />;
    } else if (this.state.token === "authorization") {
      return <Authorization token={this.state.token} />;
    } else {
      return (
        <TokenContext.Provider
          value={{
            token: this.state.token,
            getToken: this.getTokenFromСhildComponent,
            todos: []
          }}
        >
          <MainForm />
        </TokenContext.Provider>
      );
    }
  }
}

export default App;
