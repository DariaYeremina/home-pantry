import React from 'react';
import styles from './chips.module.scss';
import close from '../../assets/close.svg';

const Chips = ({query, onClick}) => (
    <div className={styles.wrapper}>
        <span className={styles.text}>{query}</span>
        <img src={close}
            alt="close"
            onClick={onClick}
            className={styles.img}/>
    </div>
);

export default Chips;