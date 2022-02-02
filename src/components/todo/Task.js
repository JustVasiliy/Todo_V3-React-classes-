import React, { Component } from "react";
import "../../../dist/css/style.css";
import { API } from "../../API/API";
import { url } from "../../../config";

import { TokenContext } from "../../service/context";
const api = new API(url);
class Task extends React.Component {
  constructor({ name, checked, id, token, getToken }) {
    super();
    this.name = name;
    this.checked = checked;
    this.id = id;
    this.token = token;
    this.getToken = getToken;
    this.inputRef = React.createRef();
    this.state = {
      checked: false,
      changeDisplay: "none",
      name: null,
      delete: false,
    };
  }
  static contextType = TokenContext;
  completeTask = async () => {
    let isCheck = this.state.checked;
    this.setState({ checked: !isCheck });
    const token = this.context.token;
    const callAPI = await api.callAPI("api/task/put", "PUT", token, {
      id: this.id,
      name: this.name,
      checked: this.state.checked,
      deleted: false,
    });
    const status = await callAPI.json();
    if ((await status.message) === "Invalid token") {
      document.cookie = "token=Invalid token";
      this.getToken("Invalid token");
    }
  };
  saveTaskСhanges = async () => {
    let display = this.state.changeDisplay;
    display = "none";
    this.setState({ changeDisplay: display });

    const text = document.getElementById(this.id).children[3].value;
    if (text.trim() !== "") {
      this.setState({ name: text });
      const token = this.context.token;
      const callAPI = await api.callAPI("api/task/put", "PUT", token, {
        id: this.id,
        name: text,
        checked: this.state.checked,
        deleted: false,
        editing: false,
      });
      const status = await callAPI.json();
      if ((await status.message) === "Invalid token") {
        document.cookie = "token=Invalid token";
        this.getToken("Invalid token");
      }
    }
  };
  changeTask = () => {
    let display = this.state.changeDisplay;
    display = "block";
    this.setState({ changeDisplay: display });
  };
  deleteTask = async () => {
    this.setState({ delete: true });
    const token = this.context.token;
    const callAPI = await api.callAPI("api/task/delete", "DELETE", token, {
      id: this.id,
    });
    const status = await callAPI.json();
    if ((await status.message) === "Invalid token") {
      document.cookie = "token=Invalid token";
      this.getToken("Invalid token");
    }
  };
  componentDidMount() {
    let isCheck = this.checked;
    this.setState({ checked: isCheck });
    let name = this.name;
    this.setState({ name: name });
  }
  setInputValue = () => {
    this.setState({ name: this.inputRef.current.value });
  };
  render() {
    return (
      <>
        <li
          className="parentPosition"
          id={this.id}
          className={this.state.delete ? "deleted" : null}
        >
          <p className={this.state.checked ? "pCheck" : null}>
            {this.state.name}
          </p>
          <input
            className="check"
            type="checkbox"
            onClick={this.completeTask}
            checked={this.state.checked}
          ></input>
          <div className="ButtonGroup parentPosition">
            <button
              className="saveBtn"
              style={{ display: this.state.changeDisplay }}
              onClick={this.saveTaskСhanges}
            >
              save
            </button>
            <button className="change" onClick={this.changeTask}>
              Change
            </button>
            <button className="delete" onClick={this.deleteTask}>
              Delete
            </button>
          </div>
          <input
            className="inputChange"
            type="text"
            style={{ display: this.state.changeDisplay }}
            ref={this.inputRef}
            onChange={this.setInputValue}
          ></input>
        </li>
      </>
    );
  }
}

export default Task;
