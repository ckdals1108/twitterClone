import './modal.css';
import React, { useRef } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';


const Modal = (props) => {
    const { open, close, header, id, content} = props;
    const [getItem, setGetItem] = useState([]);
    const [text,setContent] = useState();
    const [password,setPassword] = useState(null);
    const contentRef = useRef();
    const passwordRef = useRef();

    const errorMessage = (error) => {
        const data = error.response.data;
        const message = data.map(({defaultMessage}) => defaultMessage);
        const blankMessage = message.filter((x,idx) => {return idx === 1});
        alert(message.length===2? blankMessage : message);
    }

    const postUsers = async() => {
        const fetchdelete = await axios.put(`/api/board/${id}`,JSON.stringify({"content":contentRef.current.value,"password":passwordRef.current.value}),
        {
            headers:{
                "Content-Type" : `application/json`,
            },
        }).then((res) => alert("수정이 완료되었습니다."))
        .catch(error => {
            errorMessage(error);
        });
    }

    const deleteUsers = async() => {
        const fetchdelete = await axios.delete(`/api/board/${id}`, {data:{"password":passwordRef.current.value}})
        .then((res) => {alert("삭제가 완료되었습니다.")})
        .catch(error => {
            errorMessage(error);
        });
    }

    return (
        <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
          <section>
            <header>
              {header}
              <button className="close" onClick={close}>
                {' '}
                &times;{' '}
              </button>
            </header>
            <main><textarea id="content" ref={contentRef} defaultValue={props.children}></textarea></main>
            <footer>
            <input type="password" id="pwd" className='password' ref={passwordRef}/>
              <button className="edit" onClick={postUsers}>
                {' '}
                edit{' '}
              </button>
              <button className="delete" onClick={deleteUsers}>
                {' '}
                delete{' '}
              </button>
              <button className="close" onClick={close}>
                {' '}
                close{' '}
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    );
};

export default Modal;