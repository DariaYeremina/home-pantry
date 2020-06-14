import React from 'react';
import styles from './select.module.scss';
import Error from '../error/Error';
import propTypes from 'prop-types';
import Checkbox from '../checkbox/Checkbox';

class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMultiple: false
        }
        this.selectWrapper = null;

        this.setSelectWrapperRef = node => {
            this.selectWrapper = node;
        };
    }

    componentDidMount () {
        if (this.props.multiple) {
            document.addEventListener('click', this.closeDropdownOnOuterClick);
        }
    }

    componentWillUnmount () {
        if (this.props.multiple) {
            document.removeEventListener('click', this.closeDropdownOnOuterClick);
        }
    }

    closeDropdownOnOuterClick = (e)  => {
        if (this.selectWrapper && !this.selectWrapper.contains(e.target) && this.state.showMultiple) {
            this.toggleDropdown();
          }
    }

    multipleTitle = () => {
        if (this.props.multiple) {
            switch(this.props.chosen.length) {
                case 0: 
                    return 'Wybierz opcję';
                case 1:
                    return this.props.chosen[0];
                default:
                    return `${this.props.chosen[0]} ta jeszcze ${this.props.chosen.length - 1}`;
            }
        }
    }

    toggleDropdown = () => {
        this.setState(prevState => ({
            showMultiple: !prevState.showMultiple
        }))
    }

    render () {
        return (
            <div className={this.props.multiple ? styles.selectWrapper : null}>
                <label htmlFor={this.props.name}
                                className={this.props.multiple ? styles.multipleLabel : styles.label}>{this.props.label}</label>
                { this.props.multiple ? 
                    <div className={styles.multipleWrapper}
                        ref={node => this.setSelectWrapperRef(node)}>
                        <p className={styles.multipleTitle}
                            onClick={this.toggleDropdown}>{this.multipleTitle()}</p>
                        {this.state.showMultiple && <div className={styles.multipleDropdown}>
                            {this.props.items.map((el, index) => 
                                <Checkbox key={index}
                                            el={el}
                                            onChange={() => this.props.onChange(el)} />
                            )}
                        </div>}

                    </div> :
                    <>
                        <select value={this.props.chosen} 
                                name={this.props.name} 
                                className={styles.select}
                                onChange={this.props.onChange}>
                            <option key="-1"
                                value="">Wybierz opcję</option>
                            {this.props.items.map((el, index) => 
                                <option key={index}
                                        value={el}>{el}</option>
                            )}
                        </select>
                        {this.props.error && <Error error={this.props.error} />}
                    </>
                }
            </div>
        )
    }
};

Select.propTypes = {
    items: propTypes.array.isRequired,
    name: propTypes.string.isRequired,
    label: propTypes.string,
    multiple: propTypes.bool
}

Select.defaultProps = {
    label: '',
    multiple: false
}

export default Select;