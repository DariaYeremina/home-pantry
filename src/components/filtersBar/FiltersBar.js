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
            showChips: false
        }
    }

    search = () => {
        this.props.store.filter();
        this.setState({
            showChips: true
        })
    }

    resetSearch = () => {
        this.props.store.resetSearch();
        this.setState({
            showChips: false,
        })
    }

    render () {
        return (
            <div className={styles.wrapper}>
                <div className={styles.column}>
                    <div className={styles.searchWrapper}>
                        <Input name="query"
                                value={this.props.store.query}
                                placeholder={searchPlaceholder}
                                onChange={(e) => this.props.store.handleInput(e)}/>
                        <Button icon={search}
                            onClick={this.search} />
                    </div>
                    <div className={styles.chipsWrapper}>
                        {this.state.showChips && <Chips query={this.props.store.query}
                                                        onClick={this.resetSearch}/>}
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.filtersWrapper}>
                        <Select name={selectOptions.name}
                                multiple={selectOptions.multiple}
                                items={this.props.store.categories}
                                label={selectOptions.label}
                                chosen={this.props.store.chosenOption}
                                onChange={(e) => this.props.store.handleChosenOption(e)}/>
                        <div className={styles.buttonsWrapper}>
                            <Button onClick={this.props.store.filter}
                                    disabled={this.props.store.chosenOption.length === 0}
                                    classes={['filter']}>
                                        Filtruj
                            </Button>
                            <Button onClick={this.props.store.resetFilter}
                                    disabled={this.props.store.chosenOption.length === 0}>
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