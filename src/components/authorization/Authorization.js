import React from 'react';
import InputAuth from './InputAuth';
import '../../css/style.css';
import {API} from '../../API/API.js';
import { url } from '../../../config';
import { getCookie } from '../../../config/getCookie';

const api = new API(url)

class Authorization extends React.Component {
    send = async () => {
        const nickname = document.getElementById('nickname');
        const password = document.getElementById('password');

        if(nickname.value.trim() !== '' || password.value.trim() !== ""){
            const call = await api.callAPI('authorization', 'POST', "",  {
                nickname: nickname.value.trim(),
                password: password.value.trim(),
            });
            
            document.cookie = `token=${await call.text()}`;
            if(getCookie('token') === "You need registration!"){
            alert('User not found. May be, you need registration');
            }else{
                window.location.reload();
            }
        }
        
    }
    render() { 
        
        return <>
        <form className="Auth" onSubmit={(event)=>{
            event.preventDefault();
        }}>
        <h2>Authorizatoin</h2>
        <InputAuth
        type={'text'}
        placeholder={'Write your nickname'}
        for={'nickname'}
        labelText={'Nickname'}
        />
        <InputAuth
        type={'password'}
        placeholder={'Write your password'}
        for={'password'}
        labelText={'Password'}
        />
        <button className="Auth" onClick={this.send}>Send</button>
        </form>
       
        </>;
    }
}
 
export default Authorization;