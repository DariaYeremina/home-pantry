import React from 'react';
import styles from './startView.module.scss';
import FirebaseContext from '../../Firebase/context';

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
                products: {...snapshot.val()}
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
            <>
            {  condition ? <h1>Nie masz produktów! Zaloguj się i dodaj!</h1> : null
            }
            </>
        )
    }
};

export default StartView;