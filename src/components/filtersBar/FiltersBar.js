import React from 'react';
import styles from './filtersBar.module.scss';
import Input from '../input/Input';
import Button from '../button/Button';
import Chips from '../chips/Chips';
import Select from '../select/Select';
import search from '../../assets/search.svg';

const searchPlaceholder = 'Wpisz nazwę produktu...';

const selectOptions = {
    label: 'Kategoria',
    name: 'chosenOption'
};

class FiltersBar extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            chosenOption: null,
            query: '',
            showChips: false
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    search = () => {
        this.props.store.search(this.state.query);
        this.setState({
            showChips: true
        })
    }

    resetSearch = () => {
        this.props.store.resetSearch();
        this.setState({
            showChips: false,
            query: ''
        })
    }

    render () {
        return (
            <div className={styles.wrapper}>
                <div className={styles.column}>
                    <div className={styles.searchWrapper}>
                        <Input name="query"
                                value={this.state.query}
                                placeholder={searchPlaceholder}
                                onChange={this.handleInput}/>
                        <Button icon={search}
                            onClick={this.search} />
                    </div>
                    <div className={styles.chipsWrapper}>
                        {this.state.showChips && <Chips query={this.state.query}
                                                        onClick={this.resetSearch}/>}
                    </div>
                </div>
                <div className={styles.column}>
                    <Select name={selectOptions.name}
                            items={this.props.store.categories}
                            label={selectOptions.label}
                            chosen={this.state.selectOptions}/>
                </div>
            </div>
        )
    }
};

export default FiltersBar;