import React from 'react';
import styles from './error.module.scss';

const Error = ({error}) => (
    <p className={styles.error}>{error}</p>
);

export default Error;