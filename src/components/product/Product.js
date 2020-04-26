import React from 'react';
import styles from './product.module.scss';
import IconedButton from '../iconedButton/IconedButton';
import AddItem from '../addItem/AddItem';
import edit from '../../assets/edit.svg';
import remove from '../../assets/delete.svg';

class Product extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
    }

    removeItem = () => {
        let uid = localStorage.getItem('uid');
        this.props.firebase.deleteRequest(`products/${uid}/${this.props.id}`);
    }

    toggleModal = () => {
        this.setState(prevState => ({
            isModalOpen: !prevState.isModalOpen
        }))
    }

    render () {
        return (
            <>
            <section className={styles.wrapper}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{this.props.item.title}</h2>
                    <div className={styles.iconWrap}>
                        <img className={styles.icon} src={this.props.icon} alt={this.props.item.chosenCategory}/>
                    </div>
                </div>
                <div className={styles.content}>
                    <p>{`Ilość: ${this.props.item.amount} ${this.props.item.chosenUnit}`}</p>
                    <p>{`Categoria: ${this.props.item.chosenCategory}`}</p>
                    <div className={styles.actionsWrapper}>
                        <IconedButton onClick={this.toggleModal} 
                                      icon={edit}/>
                        <IconedButton onClick={this.removeItem} 
                                      icon={remove}/>
                    </div>
                </div>
            </section>
            {this.state.isModalOpen && <AddItem firebase={this.props.firebase}
                                                entranceData={this.props.item}
                                                id={this.props.id}
                                                closeModal={this.toggleModal}
                                                action='edit' />}
            </>
        )
    }
}

export default Product;