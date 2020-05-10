import React from 'react';
import styles from './select.module.scss';
import Error from '../error/Error';
import propTypes from 'prop-types';

const Select = ({items, name, label, chosen, onChange, error}) => (
    <>
        <label htmlFor={name}
                className={styles.label}>{label}</label>
        <select value={chosen} 
                name={name} 
                className={styles.select}
                onChange={onChange}>
            <option key="-1"
                value="">Wybierz opcję</option>
            {items.map((el, index) => 
                <option key={index}
                        value={el}>{el}</option>
            )}
        </select>
        {error && <Error error={error} />}
    </>
)

Select.propTypes = {
    items: propTypes.array.isRequired,
    name: propTypes.string.isRequired,
    label: propTypes.string
}

Select.defaultProps = {
    label: ''
}

export default Select;