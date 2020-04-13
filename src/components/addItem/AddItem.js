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

class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            categories: [],
            chosenCategory: ''
        }
    }

    getCategories = () => {
        let get = this.props.firebase.getCategories();
        get.on('value', (snapshot) => {
            this.setState({
                categories: [...snapshot.val()]
            })
          });
    }

    componentDidMount () {
        this.getCategories();
    }

    handleInput = (e) => {
        console.log(e.target)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render () {
        return (
            <div className={styles.modal}>
                <img onClick={this.props.closeModal} 
                    className={styles.close}
                    src={close} alt="close" />
                <h2 className={styles.title}>Dodaj produkt swojej spiżarni</h2>
                <Input type={titleParameters.type}
                            name={titleParameters.name}
                            placeholder={titleParameters.placeholder}
                            label={titleParameters.label} 
                            value={this.state.title}
                            onChange={this.handleInput}/>
                <Select items={this.state.categories}
                        name={selectParameters.name}
                        label={selectParameters.label}
                        chosen={this.state.chosenCategory}
                        onChange={this.handleInput} />
            </div>
        )
    }
}

export default AddItem;