import React, { useState } from 'react';
import styles from './input.module.css'
import { useRef } from 'react';
import axios from 'axios';

const Input = () => {
    const [content,setContent] = useState(null);
    const [password,setPassword] = useState(null);
    const nickname = useRef();

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
        axios.post('http://localhost:8080/api/board',JSON.stringify({"nickname":nickname.current.value,"content":content,"password":password}),
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
            <textarea id="content" onChange={contentHandler}/>
            <input type="text" id="nickname" ref={nickname} className={styles.nickname} placeholder="닉네임"/>
            <input type="password" id="pwd" className={styles.password} onChange={passwordHandler} placeholder="비밀번호"/><button onClick={clickHandler}>전송</button>
        </div>
    );
};

export default Input;