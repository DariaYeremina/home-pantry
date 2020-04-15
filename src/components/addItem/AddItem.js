import React from 'react';
import styles from './addItem.module.scss';
import close from '../../assets/close.svg';
import Button from '../button/Button';
import Input from '../input/Input';
import Select from '../select/Select';

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
    }

    handleInput = (e) => {
        console.log(e.target)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    postNewProduct = (e) => {
        let item = {
            title: this.state.title,
            chosenCategory: this.state.chosenCategory,
            chosenUnit: this.state.chosenUnit,
            amount: this.state.amount
        }
        let uid = localStorage.getItem('uid');
        let newKey = this.props.firebase.getNewKey(`products/${uid}`);
        this.props.firebase.postRequest(`products/${uid}/${newKey}`, item)
            .then(() => {
                this.props.closeModal();
            })
    }

    render () {
        return (
            <div className={styles.modal}>
                <img onClick={this.props.closeModal} 
                    className={styles.close}
                    src={close} alt="close" />
                <h2 className={styles.title}>Dodaj produkt swojej spiżarni</h2>
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
                    <Button onClick={this.postNewProduct}>Dodaj</Button>
                </div>
            </div>
        )
    }
}

export default AddItem;