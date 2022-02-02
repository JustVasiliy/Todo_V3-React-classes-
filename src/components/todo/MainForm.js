import React, { Component } from "react";
import "../../../dist/css/style.css";
import Task from "./Task";
import { API } from "../../API/API";
import { url } from "../../../config";

const api = new API(url);
import { TokenContext } from "../../service/context";

class MainForm extends React.Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
    this.state = {
      checked: false,
      todos: [],
    };
  }

  static contextType = TokenContext;

  catchToken = (text) => {
    this.context.getToken(text);
  };

  getTasks = async () => {
    const token = this.context.token;
    const callAPI = await api.callAPI("api/task/get", "GET", token);
    if (callAPI.message === "Invalid token") {
      document.cookie = "token=Invalid token";
      this.catchToken("Invalid token");
    } else {
      this.setState({ todos: await callAPI });
    }
  };

  createTask = async () => {
    const input = this.inputRef.current.value;

    if (input.trim() !== "") {
      const token = this.context.token;
      await api.callAPI("api/task/create", "POST", token, {
        name: input.trim(),
        checked: false,
        deleted: false,
        token: token,
      });
      const callAPI = await api.callAPI("api/task/get", "GET", token);
      if (callAPI.message === "Invalid token") {
        document.cookie = `token=${callAPI.message}`;
        this.catchToken("Invalid token");
      } else {
        this.setState({ todos: await callAPI });
      }
    }
    this.inputRef.current.value = "";
  };
  logOut = () => {
    document.cookie = "token=Invalid token";
    this.catchToken("Invalid token");
  };
  componentDidMount() {
    this.getTasks();
  }
  render() {
    return (
      <>
        <button className="logout" onClick={this.logOut}>
          Log Out
        </button>

        <section>
          <h1>Todo List</h1>
          <ul className="listItems">
            {this.state.todos.map((el) => {
              return (
                <Task
                  name={el.name}
                  id={el.id}
                  key={el.id}
                  checked={el.checked}
                  token={this.props.token}
                  getToken={this.catchToken}
                />
              );
            })}
          </ul>
          <div className="createNewItem">
            <input
              ref={this.inputRef}
              className="inputCreateName"
              type="text"
              placeholder="Write todo..."
            ></input>
            <button className="btnCreate" onClick={this.createTask}>
              Create
            </button>
          </div>
        </section>
      </>
    );
  }
}

export default MainForm;
