import React, { Component } from "react";
import "../../css/style.css";
import Task from "./Task";
import { getCookie } from "../../../config/getCookie";

import { API } from "../../API/API";
import { url } from "../../../config";

import Registration from "../registration/Registration";
const api = new API(url);


class MainForm extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      todos: [],
    };

    this.id = 0;
  }
  get = async () => {
    const token = getCookie("token");
      const call = await api.callAPI("get", "GET", token);
      if(call.message === 'Invalid token'){
        document.cookie = "token=Invalid token"
        window.location.reload()
      }else{
        this.setState({todos: await call});
      }
      
  }
  complete = () => {
    let isCheck = this.state.checked;
    this.setState({ checked: !isCheck });
  };
  create = async () => {
    const input = document.querySelector(".inputCreateName");
    if (input.value.trim() !== "") {
      const token = getCookie("token");
      await api.callAPI("create", "POST", token, {
        name: input.value.trim(),
        checked: false,
        deleted: false,
        editing: false,
        token: token,
      });
      const call = await api.callAPI("get", "GET", token);
      console.log(call)
      if(call.message === 'Invalid token'){
        console.log(call.message)
        document.cookie = `token=${call.message}`;
        window.location.reload();
      }else{
        this.setState({todos: await call});
      }
     
     
      
      
    }
    input.value = "";
  };
  componentDidMount(){
    this.get()
  }
  render() {
    
          return (
            <>
              <button
                className="logout"
                onClick={()=> {
                  document.cookie = "token=Invalid token";
                  window.location.reload();
                }}
              >
                Log Out
              </button>
              <section>
                <h1>Todo List</h1>
                <ul className="listItems">
                  {this.state.todos.map((el) => {
                  return <Task name={el.name} id={el.id} key={el.id} checked={el.checked} />})}
                </ul>
                <div className="createNewItem">
                  <input
                    className="inputCreateName"
                    type="text"
                    placeholder="Write todo..."
                  ></input>
                  <button className="btnCreate" onClick={this.create}>
                    Create
                  </button>
                </div>
              </section>
            </>
          );
        
      
    
  }
}

export default MainForm;
