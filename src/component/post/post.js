import React, { useState, useRef } from 'react';
import styles from './post.module.css';
import Comment from '../comment/comment'
import axios from 'axios';
import Modal from '../modal/modal';

const Post = (Props) => {
    const [open, setOpen] = useState(false);
    const list = Props;
    const [comment, setComment] = useState([""]);
    const [modalOpen,setModalOpen] = useState(false);    
    const commentText = useRef();
    const commentpassword = useRef();
    const commentnickname = useRef();


    const openComment = () => {
        fetchComment();
        setOpen(!open);
    }

    const fetchComment = () => {
        const listGet = axios.get(`http://localhost:8080/api/comments/${list.list.id}`)
        .then(data => {
          setComment(data.data);
        });
    }

    const openModal = (id, content) => {
        setModalOpen(true);
    };

    const closeMdal = () => {
        setModalOpen(false);
    };

    const errorMessage = (error) => {
      const data = error.response.data;
      const message = data.map(({defaultMessage}) => defaultMessage);
      const blankMessage = message.filter((x,idx) => {return idx === 1});
      alert(message.length===2 ? blankMessage : message);
  }


    const clickHandler = (e) => {
      e.preventDefault();
      axios.post(`http://localhost:8080/api/comment/${list.list.id}`,JSON.stringify({"nickname":commentnickname.current.value,"content":commentText.current.value,"password":commentpassword.current.value}),
      {
          headers:{
              "Content-Type" : `application/json`,
          },
      }).then((res) => alert("생성이 완료되었습니다."))
      .catch(error => {
        errorMessage(error);
    });
  }

    return (    
        <div>
            <div className={styles.showbox} ><li><span>닉네임 : {list.list.nickname}</span></li><li>{list.list.content}<button onClick={()=>openModal()}>수정/삭제</button><button onClick={openComment}>댓글</button>
            {open ? <><div><textarea ref={commentText}/><input type="text" id="nickname" ref={commentnickname} placeholder="닉네임"/>
            <input type="password" ref={commentpassword} placeholder="비밀번호"/><button onClick={clickHandler}>{' '}댓글달기{' '}</button></div> 
            {comment.map(comment => (<Comment open={open} close={openComment} key={comment.id} comment={comment} />))}
            </>: null}
            
            </li><br/></div>
            <Modal open={modalOpen} close={closeMdal} header="수정하기 및 삭제하기" id={list.list.id}>{list.list.content}</Modal>
        </div>
    
    );
};

export default Post;