import React from 'react';
import styles from './logo.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDove } from "@fortawesome/free-solid-svg-icons";

const Logo = () => {
    return (
        <div className={styles.logo}>
            <FontAwesomeIcon icon={faDove} className="" size="8x" color="#FFE08C" />
        </div>
    );
};

export default Logo;