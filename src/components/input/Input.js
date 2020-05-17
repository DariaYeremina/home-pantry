import React from 'react';
import styles from './input.module.scss';
import Error from '../error/Error';
import propTypes from 'prop-types';

const Input = ({type, name, placeholder, label, value, onChange, error, onBlur}) => (
    <>
        {label && <label className={styles.label} htmlFor={name}>{ label }</label>}
        <input  className={styles.input}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}/>
        {error && <Error error={error} />}
    </>
);

Input.propTypes = {
    type: propTypes.string,
    name: propTypes.string.isRequired,
    placeholder: propTypes.string.isRequired,
    label: propTypes.string,
    value: propTypes.string.isRequired,
    onChange: propTypes.func,
}

Input.defaultProps = {
    type: 'text'
}

export default Input;