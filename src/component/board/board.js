import React, { useCallback, useState } from 'react';
import Input from '../input/input';
import List from '../list/list';
import Logo from '../logo/logo';
import Title from '../logo/title';
import styles from './board.module.css';

const Board = () => {
    const [inputUpdate, setinputUpdate] = useState();
    const forceUpdate = useCallback(() => setinputUpdate({}), []);
    return (
        <div className={styles.board}>
            <Logo />
            <Title />
            <Input forceUpdate={forceUpdate}/>
            <List forceUpdate={inputUpdate}/>
        </div>
    );
};

export default Board;