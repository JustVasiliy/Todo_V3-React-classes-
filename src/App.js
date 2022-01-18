import React from "react";
import Authorization from "./components/authorization/Authorization";
import Registration from "./components/registration/Registration";
import MainForm from "./components/todo/MainForm";
import RegistrOrAuth from "./components/RegistrOrAuth";
import {getCookie} from "../config/getCookie.js";
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import { Navigate} from "react-router";


class App extends React.Component  {

  render(){
    if(getCookie('token') === 'Invalid token' || getCookie('token') === '' || getCookie("token") === undefined){
      return <RegistrOrAuth/>
    }else if(getCookie('token') === "registration"){
      return <Registration/>
    }else if(getCookie('token') === "authorization"){
      return <Authorization/>
    }else{
      return <MainForm/>
    }
  //     return (
  //       <>
  //       {/* <BrowserRouter>
  //       <Routes>
  //         <Route path='/' element={<RegistrOrAuth/>}/>
  //         <Route path='/registration' element={<Registration/>}/>
  //         <Route path='/authorization' element={<Authorization/>}/>
  //         <Route path='/main' element={<MainForm/>}/>
  //       </Routes>
  //       </BrowserRouter> */}
        
  //     </>
  // )
  }
};

export default App;
