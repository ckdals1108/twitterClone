import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './list.module.css';
import Post from '../post/post';

const List = () => {
    const [list, setList] = useState([]);
    
    const fetchUsers = () => {
        const listGet = axios.get(`${process.env.REACT_APP_API_HOST}/api/boards`)
        .then(data => {
            setList(data.data);
        });
    }

    useEffect(() => {
        fetchUsers();
    },[]);

    return (
        <div className={styles.list}>
            <ul>
                {list.map(list => (<Post key={list.id} list={list}/>))}
            </ul>
        </div>
    );
};

export default List;