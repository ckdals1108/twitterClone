import './comment.css';
import React, { useReducer, useState ,useRef} from 'react';
import axios from 'axios';


const Comment = (props) => {
    const {open, close, comment} = props;
    const [editButton,setEditButton] = useState(false);
    const commentpassword = useRef();
    const commentText = useRef();

    const errorMessage = (error) => {
      const data = error.response.data;
      const message = data.map(({defaultMessage}) => defaultMessage);
      const blankMessage = message.filter((x,idx) => {return idx === 1});
      alert(message.length===2 ? blankMessage : message);
  }

    const editButtonHandller = () => {
      setEditButton(!editButton);
    }

    const editHandller = () => {
      putUsers();
      setEditButton(!editButton);
    }

    const deleteHandller = () => {
      deleteUsers();
      setEditButton(!editButton);
    }

    const putUsers = async() => {
      const fetchdelete = await axios.put(`/api/comment/${comment.id}`,JSON.stringify({"content":commentText.current.value,"password":commentpassword.current.value}),
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
      const fetchdelete = await axios.delete(`/api/comment/${comment.id}`, {data:{"password":commentpassword.current.value}})
      .then((res) => {alert("삭제가 완료되었습니다.")})
      .catch(error => {
          errorMessage(error);
      });
    }

    return (
        <div className='comment'>
          
        {open ? (
          <section>
            <div className='in'>ㄴ</div>
            <main>{editButton ? <div className='showbox'>{comment.nickname}  &nbsp;&nbsp; <span>:</span> &nbsp; <textarea ref={commentText}defaultValue={comment.content}></textarea>
            <input type="password" ref={commentpassword} placeholder="비밀번호"/>
            <button onClick={editHandller}>{' '}수정{' '}</button><button onClick={deleteHandller}>{' '}삭제{' '}</button><button onClick={editButtonHandller}>{' '}닫기{' '}</button></div>
            : <>{comment.nickname} : {comment.content}<button className="delete" onClick={editButtonHandller}>{' '}수정/삭제{' '}</button></>}</main>

          </section>
        ) : null}
        <br></br>
      </div>
    );
};

export default Comment;