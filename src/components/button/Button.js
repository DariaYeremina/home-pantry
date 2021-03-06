import React from 'react';
import styles from './button.module.scss';
import propTypes from 'prop-types';

const Button = ({children, onClick, secondary}) => (
    <a className={secondary ? styles.buttonSecondary : styles.button}
        onClick={onClick}>{ children }</a>
);

Button.propTypes = {
    onClick: propTypes.func,
    secondary: propTypes.bool
}

Button.defaultProps = {
    secondary: false
}

export default Button;