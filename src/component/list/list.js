import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Listget from '../api/listget';
import styles from './list.module.css';
import Modal from  '../modal/modal';

const List = () => {
    const [list, setList] = useState([]);
    const [modalOpen,setModalOpen] = useState(false);
    const [editId, setEditid] = useState();
    const [editContent, setContent] = useState();

    const fetchUsers = () => {
        const listGet = axios.get('/api/boards')
        .then(data => {
            setList(data.data);
        });
    }

    const openModal = (id, content) => {
        setModalOpen(true);
        setEditid(id);
        setContent(content)
    };

    const closeMdal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        fetchUsers();
    },[]);

    return (
        <div className={styles.list}>
            <ul>
                {list.map(list => (
                    <div className={styles.showbox} key={list.id}><li>{list.content}<button onClick={()=>{openModal(list.id, list.content)}}>수정/삭제</button>
                    </li><br/></div>
                ))}
            </ul>
            <Modal open={modalOpen} close={closeMdal} header="수정하기" id={editId}>{editContent}</Modal>
        </div>
    );
};

export default List;