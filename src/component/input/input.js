import React, { useState } from 'react';
import styles from './input.module.css'
import { useRef } from 'react';
import axios from 'axios';

const Input = () => {
    const [content,setContent] = useState(null);
    const [password,setPassword] = useState(null);

    const contentHandler = (e) => {
        e.preventDefault();
        setContent(e.target.value);
    };

    const passwordHandler = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }

    const clickHandler = (e) => {
        e.preventDefault();
        axios.post('/api/board',JSON.stringify({"content":content,"password":password}),
        {
            headers:{
                "Content-Type" : `application/json`,
            },
        }).then((res) => alert("생성이 완료되었습니다."))
        .catch();
        setContent("");
        setPassword("");
        document.getElementById("content").value="";
        document.getElementById("pwd").value="";
    }

    return (
        <div className={styles.input}>
            <div className={styles.textarea}><textarea id="content" onChange={contentHandler}/></div>
            <div className={styles.submit}><input type="password" id="pwd" className={styles.password} onChange={passwordHandler}/><button onClick={clickHandler}>보내기</button></div>
            
        </div>
    );
};

export default Input;