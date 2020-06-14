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
    name: 'chosenOption',
    multiple: true
};

class FiltersBar extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            chosenOption: [],
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

    filter = () => {
        this.props.store.filter(this.state.chosenOption);
    }

    resetSearch = () => {
        this.props.store.resetSearch();
        this.setState({
            showChips: false,
            query: ''
        })
    }

    resetFilter = () => {
        this.props.store.resetFilter();
        this.setState({
            chosenOption: []
        })
    }

    handleSelect = (e) => {
        this.setState(prevState => ({
            chosenOption: prevState.chosenOption.find(el => el === e)
                            ? prevState.chosenOption.filter(el => el !== e)
                            : [...prevState.chosenOption, e]
        }))
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
                    <div className={styles.filtersWrapper}>
                        <Select name={selectOptions.name}
                                multiple={selectOptions.multiple}
                                items={this.props.store.categories}
                                label={selectOptions.label}
                                chosen={this.state.chosenOption}
                                onChange={this.handleSelect}/>
                        <div className={styles.buttonsWrapper}>
                            <Button onClick={() => this.props.store.filter(this.state.chosenOption)}
                                    disabled={this.state.chosenOption.length === 0}
                                    classes={['filter']}>
                                        Filtruj
                            </Button>
                            <Button onClick={this.resetFilter}
                                    disabled={this.state.chosenOption.length === 0}>
                                        Zresetuj
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default FiltersBar;