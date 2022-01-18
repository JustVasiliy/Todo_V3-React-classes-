import React from "react";
import Registration from "./registration/Registration";
import { getCookie } from "../../config/getCookie";



class RegistrOrAuth extends React.Component {
  render() {
    
    
      return (
        <form className="AOR">
          <h2 className="AOR">Registration or Authorization</h2>
          <div className="containerAOR">
            <a className="AOR" to="/registration" onClick={()=>{document.cookie = "token=registration";
            window.location.reload();
          }}>
              Registration
            </a>
            <a className="AOR" to="/authorization" onClick={()=>{document.cookie = "token=authorization";
            window.location.reload();
          }}>
              Authorization
            </a>
          </div>
        </form>
      );

    
  }
}

export default RegistrOrAuth;
