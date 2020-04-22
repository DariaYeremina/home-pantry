import React from 'react';
import styles from './startView.module.scss';
import FirebaseContext from '../../Firebase/context';
import Product from '../../components/product/Product';
import meat from '../../assets/categories/meat.svg';

class StartView extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            products: {}
        }
    }

    getProducts = () => {
        let uid = localStorage.getItem('uid');
        let get = this.props.firebase.getRequest(`products/${uid}`);
        get.on('value', (snapshot) => {
            this.setState({
                products: Object.values(snapshot.val())
            })
          });
    }

    objectIsEmpty = () => {
        return Object.keys(this.state.products).length === 0 && this.state.products.constructor;
    }

    componentDidMount () {
        this.getProducts();
    }

    render () {
        let condition = this.objectIsEmpty();
        
        return (
            <div className={styles.wrapper}>
            {  condition ? <h1>Nie masz produktów! Zaloguj się i dodaj!</h1> : 
                this.state.products.map((el, index) => <Product key={index} item={el} icon={meat}/>)
            }
            </div>
        )
    }
};

export default StartView;