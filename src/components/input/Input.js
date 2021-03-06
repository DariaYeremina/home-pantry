import React from 'react';
import styles from './input.module.scss';
import propTypes from 'prop-types';

const Input = ({type, name, placeholder, label, value, onChange, error, onBlur}) => (
    <>
    <label className={styles.label} htmlFor={name}>{ label }</label>
    <input  className={styles.input}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}/>
    {error && <p className={styles.error}>{error}</p>}
    </>
);

Input.propTypes = {
    type: propTypes.string,
    name: propTypes.string.isRequired,
    placeholder: propTypes.string.isRequired,
    label: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
    onChange: propTypes.func,
}

Input.defaultProps = {
    type: 'text'
}

export default Input;