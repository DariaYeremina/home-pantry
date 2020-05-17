import React from 'react';
import styles from './addItem.module.scss';
import close from '../../assets/close.svg';
import ItemForm from './ItemForm';
import propTypes from 'prop-types';

const modalTitle = {
    add: 'Dodaj produkt do swojej spiżarni',
    edit: 'Edytuj dane produktu'
};

class AddItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
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

    getUnits = () => {
        let get = this.props.firebase.getRequest('units');
        get.on('value', (snapshot) => {
            this.setState({
                units: [...snapshot.val()]
            })
          });
    }

    componentDidMount () {
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
                <ItemForm title={this.state.title}
                          chosenCategory={this.state.chosenCategory}
                          amount={this.state.amount}
                          chosenUnit={this.state.chosenUnit}
                          handleInput={this.handleInput}
                          action={this.props.action}
                          writeAction={this.writeAction}
                          categories={this.props.store.categories}
                          units={this.state.units}  />
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