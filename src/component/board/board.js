import React from 'react';
import Input from '../input/input';
import List from '../list/list';
import Logo from '../logo/logo';
import Title from '../logo/title';
import styles from './board.module.css'

const Board = () => {
    return (
        <div className={styles.board}>
            <Logo />
            <Title />
            <Input />
            <List />
        </div>
    );
};

export default Board;