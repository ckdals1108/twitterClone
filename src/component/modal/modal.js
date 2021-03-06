import './modal.css';
import React, { useRef } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';


const Modal = (props) => {
    const { open, close, header, id} = props;
    const contentRef = useRef();
    const passwordRef = useRef();
    const {refresh} = props;

    const errorMessage = (error) => {
        const data = error.response.data;
        const message = [data].map(({defaultMessage}) => defaultMessage);
        const blankMessage = message.filter((x,idx) => {return idx === 1});
        alert(message.length===2 ? blankMessage : message);
    }

    const postUsers = async() => {
        const fetchdelete = await axios.put(`${process.env.REACT_APP_API_HOST}/api/board/${id}`,JSON.stringify({"content":contentRef.current.value,"password":passwordRef.current.value}),
        {
            headers:{
                "Content-Type" : `application/json`,
            },
        }).then((res) => alert("수정이 완료되었습니다."))
        .catch(error => {
            errorMessage(error);
        })
        refresh();
    }

    const deleteUsers = async() => {
        const fetchdelete = await axios.delete(`${process.env.REACT_APP_API_HOST}/api/board/${id}`, {data:{"password":passwordRef.current.value}})
        .then((res) => {alert("삭제가 완료되었습니다.")})
        .catch(error => {
            errorMessage(error);
        })
        refresh();
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
                수정{' '}
              </button>
              <button className="delete" onClick={deleteUsers}>
                {' '}
                삭제{' '}
              </button>
              <button className="close" onClick={close}>
                {' '}
                닫기{' '}
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    );
};

export default Modal;