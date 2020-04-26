import React from 'react';
import styles from './addItem.module.scss';
import close from '../../assets/close.svg';
import Button from '../button/Button';
import Input from '../input/Input';
import Select from '../select/Select';
import propTypes from 'prop-types';

const titleParameters = {
    name: 'title',
    placeholder: 'Wpisz nazwę',
    label: 'Nazwa',
};

const selectParameters = {
    name: 'chosenCategory',
    label: 'Kategoria',
};

const unitParameters = {
    name: 'chosenUnit',
    label: 'Wymiar',
};

const amountParameters = {
    name: 'amount',
    placeholder: 'Wpisz ilość',
    label: 'Ilość',
};

const modalTitle = {
    add: 'Dodaj produkt do swojej spiżarni',
    edit: 'Edytuj dane produktu'
};

const buttonTitle = {
    add: 'Dodaj',
    edit: 'Zapisz zmiany'
};

class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            categories: [],
            chosenCategory: '',
            units: [],
            chosenUnit: '',
            amount: ''
        }
    }

    setEntranceData = () => {
        if (this.props.entranceData) {
            Object.keys(this.props.entranceData).forEach(key => {
                this.setState({
                    [key]: this.props.entranceData[key]
                });
            })
        }
    }

    getCategories = () => {
        let get = this.props.firebase.getRequest('categories');
        get.on('value', (snapshot) => {
            this.setState({
                categories: [...snapshot.val()]
            })
          });
    }

    getUnits = () => {
        let get = this.props.firebase.getRequest('units');
        get.on('value', (snapshot) => {
            this.setState({
                units: [...snapshot.val()]
            })
          });
    }

    componentDidMount () {
        this.getCategories();
        this.getUnits();
        this.setEntranceData();
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    writeAction = () => {
        let item = {
            title: this.state.title,
            chosenCategory: this.state.chosenCategory,
            chosenUnit: this.state.chosenUnit,
            amount: this.state.amount
        }
        let uid = localStorage.getItem('uid');
        let newKey = this.props.firebase.getNewKey(`products/${uid}`);
        this.request(uid, item, newKey)
            .then(() => {
                this.props.closeModal();
            })
    }

    request = (uid, item, newKey) => {
        if (this.props.action === 'add') {
            return this.props.firebase.postRequest(`products/${uid}/${newKey}`, item);
        } 
        if (this.props.action === 'edit') {
            return this.props.firebase.updateRequest(`products/${uid}/${this.props.id}`, item);
        }
    }

    

    render () {
        return (
            <div className={styles.modal}>
                <img onClick={this.props.closeModal} 
                    className={styles.close}
                    src={close} alt="close" />
                <h2 className={styles.title}>{modalTitle[this.props.action]}</h2>
                <Input name={titleParameters.name}
                            placeholder={titleParameters.placeholder}
                            label={titleParameters.label} 
                            value={this.state.title}
                            onChange={this.handleInput}/>
                <Select items={this.state.categories}
                        name={selectParameters.name}
                        label={selectParameters.label}
                        chosen={this.state.chosenCategory}
                        onChange={this.handleInput} />
                <Input name={amountParameters.name}
                            placeholder={amountParameters.placeholder}
                            label={amountParameters.label} 
                            value={this.state.amount}
                            onChange={this.handleInput}/>
                <Select items={this.state.units}
                        name={unitParameters.name}
                        label={unitParameters.label}
                        chosen={this.state.chosenUnit}
                        onChange={this.handleInput} />
                <div className={styles.modalActions}>
                <Button onClick={this.writeAction}>{buttonTitle[this.props.action]}</Button>
                </div>
            </div>
        )
    }
}

AddItem.propTypes = {
    action: propTypes.oneOf(['add', 'edit']),
    entranceData: propTypes.object
}

AddItem.defaultProps = {
    action: 'add'
}

export default AddItem;