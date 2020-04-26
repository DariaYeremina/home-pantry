import React from 'react';
import styles from './iconedButton.module.scss';

const IconedButton = ({icon, onClick}) => (
    <img    className={styles.button} 
            src={icon} 
            onClick={onClick}
            alt='button'/>
);

export default IconedButton;