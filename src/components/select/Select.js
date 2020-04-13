import React from 'react';
import styles from './select.module.scss';
import propTypes from 'prop-types';

const Select = ({items, name, label, chosen, onChange}) => (
    <>
        <label htmlFor={name}
                className={styles.label}>{label}</label>
        <select value={chosen} 
                name={name} 
                className={styles.select}
                onChange={onChange}>
            <option key="-1"
                value={null}>Wybierz opcję</option>
            {items.map((el, index) => 
                <option key={index}
                        value={el}>{el}</option>
            )}
        </select>
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