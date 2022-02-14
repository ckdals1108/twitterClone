import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Listget from '../api/listget';
import styles from './list.module.css'

const List = () => {
    const [list, setList] = useState([]);

    const fetchUsers = () => {
        const listGet = axios.get('/api/boards')
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
                {list.map(list => (
                    <div className={styles.showbox} key={list.id}><li>{list.content}<button>임시</button></li><br/></div>
                ))}
            </ul>
        </div>
    );
};

export default List;