import React from 'react';
import InputReg from './InputReg';
import '../../css/style.css';
import { API } from '../../API/API';
import {url} from '../../../config/index.js'
import { v4 as uuidv4 } from 'uuid';

const api = new API(url);

class Registration extends React.Component {
    send= async ()=> {
        const name = document.querySelector('#name');
        const surname = document.querySelector('#surname');
        const nickname = document.querySelector('#nickname');
        const password = document.querySelector('#password');
        
        if(name.value.trim() !== '' || surname.value.trim() !== '' || nickname.value.trim() !== "" || password.value.trim() !== ''){
            const call = await api.callAPI('registration', "POST", "123", {
                name: name.value.trim(),
                surname: surname.value.trim(),
                nickname: nickname.value.trim(),
                password: password.value.trim(),
                id: uuidv4(),
              });
              document.cookie = `token=${ await call.text()}`;
              
        }else{
            alert("Invalid data. Try another entry.")
        }
        if(document.cookie === "token=This nickname already exists"){
            alert('This nickname already exists. Change it.')
        }else{
            window.location.reload()
        }
        
    }
    render() { 
        
        return <>
        <form className="Registr" onSubmit={function(event){
            event.preventDefault()
        }}>
        <h2>Registration</h2>
        <InputReg
        labelText={'Name'}
        placeholder={'Write your name'}
        for={'name'}
        type={'text'}
        />
        <InputReg
        labelText={'Surname'}
        placeholder={'Write your surname'}
        for={'surname'}
        type={'text'}
        />
        <InputReg
        labelText={'Nickname'}
        placeholder={'Write your nickname'}
        for={'nickname'}
        type={'text'}
        />
        <InputReg
        labelText={'Password'}
        placeholder={'Write your password'}
        for={'password'}
        type={'password'}
        />
        <button className="Registr" onClick={this.send} >Send</button>
        </form>
        
        
        
        </>;
    }
}


export default Registration;