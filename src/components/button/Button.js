import React from 'react';
import styles from './button.module.scss';
import propTypes from 'prop-types';
import cx from 'classnames';

const Button = ({children, onClick, secondary, icon, disabled, classes}) => {
    let propClasses = {};
    classes.forEach(el => {
        propClasses[styles[el]] = true
    });
    const classNames = cx({
        ...propClasses,
        [styles.buttonSecondary]: secondary,
        [styles.button]: !secondary
    });

    return (
        icon ? <img src={icon}
                    className={styles.iconed}
                    alt="button"
                    onClick={onClick} /> :
                <button className={classNames}
                    onClick={onClick} 
                    disabled={disabled}>{ children }</button>
    )
};

Button.propTypes = {
    onClick: propTypes.func,
    secondary: propTypes.bool,
    classes: propTypes.arrayOf(propTypes.string)
}

Button.defaultProps = {
    secondary: false,
    disabled: false,
    classes: []
}

export default Button;