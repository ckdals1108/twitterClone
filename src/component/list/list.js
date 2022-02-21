import axios from 'axios';
import React, { useEffect, useState , useCallback} from 'react';
import styles from './list.module.css';
import Post from '../post/post';

const List = (Props) => {
    const [list, setList] = useState([]);
    const {forceUpdate} = Props;
    const [inputUpdate, setinputUpdate] = useState({});

    const refresh = () => {
        setinputUpdate({...inputUpdate});
    }
    
    const fetchUsers = async() => {
        const listGet = await axios.get(`${process.env.REACT_APP_API_HOST}/api/boards`)
        .then(data => {
            setList(data.data);
        });
    }

    useEffect(() => {
        fetchUsers();
    },[]);

    useEffect(() => {
        fetchUsers();
    },[forceUpdate]);

    useEffect(() => {
        fetchUsers();
    },[inputUpdate])

    return (
        <div className={styles.list}>
            <ul>
                {list.map(list => (<Post key={list.id} list={list} listRefresh={refresh}/>))}
            </ul>
        </div>
    );
};

export default List;