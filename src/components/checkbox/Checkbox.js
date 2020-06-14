import React from 'react';
import styles from './checkbox.module.scss';

class Checkbox extends React.Component {
    state = {
        checked: false
    }
    handleCheckbox = () => {
        this.setState(prevState => ({
            checked: !prevState.checked
        }));
        this.props.onChange();
    }

    render () {
        const {el} = this.props;
        const {checked} = this.state;

        const labelClass = checked ? styles.labelChecked : styles.label;

        return (
            <div>
                <input type="checkbox"
                        className={styles.input}
                        name={el}
                        value={el}/>
                <label onClick={this.handleCheckbox}
                        htmlFor={el}
                        className={labelClass}>
                    {el}
                </label>
            </div>
        )
    }
};

export default Checkbox;