import React, { Component } from "react";
import "../../css/style.css";
import { getCookie } from "../../../config/getCookie";
import { API } from "../../API/API";
import { url } from "../../../config";
const api = new API(url);
class Task extends React.Component {
  constructor() {
    super();

    this.state = {
      checked: false,
      changeDisplay: "none",
      name: null,
      delete: false
    };
  }

  complete = async () => {
    let isCheck = this.state.checked;
    this.setState({ checked: !isCheck });
    const token = getCookie("token");
    const res = await api.callAPI("put", "PUT", token, {
      id: this.props.id,
      name: this.props.name,
      checked: !isCheck,
      deleted: false,
      editing: false,
    });
    const status = await res.json();
    if (status.status === 401) {
      document.cookie = "token=Invalid token";
      window.location.reload();
    }
  };
  save = async () => {
    let display = this.state.changeDisplay;
    display = "none";
    this.setState({ changeDisplay: display });

    const text = document.getElementById(this.props.id).children[3].value;
    if (text.trim() !== "") {
      this.setState({ name: text });
      const token = getCookie("token");
      const res = await api.callAPI("put", "PUT", token, {
        id: this.props.id,
        name: text,
        checked: this.state.checked,
        deleted: false,
        editing: false,
      });
      const status = await res.json();
      if (status.status === 401) {
        document.cookie = "token=Invalid token";
        window.location.reload();
      }
    }
  };
  change = () => {
    let display = this.state.changeDisplay;
    display = "block";
    this.setState({ changeDisplay: display });
  };
  delete = async () => {
    this.setState({delete: true})
    const token = getCookie("token");
    const res = await api.callAPI("delete", "DELETE", token, { id: this.props.id });
    const status = await res.json();
    if (status.message === "Invalid token") {
      document.cookie = "token=Invalid token";
      window.location.reload();
    }
  }
  componentDidMount() {
    let isCheck = this.props.checked;
    this.setState({ checked: isCheck });
    let name = this.props.name;
    this.setState({ name: name });
  }
  render() {
    return (
      <>
        <li className="parentPosition" id={this.props.id} className={this.state.delete ? "deleted" : null}>
          <p className={this.state.checked ? "pCheck" : null}>
            {this.state.name}
          </p>
          <input
            className="check"
            type="checkbox"
            onClick={this.complete}
            checked={this.state.checked}
          ></input>
          <div className="ButtonGroup parentPosition">
            <button
              className="saveBtn"
              style={{ display: this.state.changeDisplay }}
              onClick={this.save}
            >
              save
            </button>
            <button className="change" onClick={this.change}>
              Change
            </button>
            <button className="delete" onClick={this.delete}>Delete</button>
          </div>
          <input
            className="inputChange"
            type="text"
            style={{ display: this.state.changeDisplay }}
          ></input>
        </li>
      </>
    );
  }
}

export default Task;
