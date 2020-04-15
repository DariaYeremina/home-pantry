import React from 'react';
import styles from './startView.module.scss';
import FirebaseContext from '../../Firebase/context';

class StartView extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            products: []
        }
    }

    getProducts = () => {
        let uid = localStorage.getItem('uid');
        let get = this.props.firebase.getRequest(`products/${uid}`);
        get.on('value', (snapshot) => {
            this.setState({
                products: [...snapshot.val()]
            })
          });
    }

    // componentDidMount () {
    //     this.getProducts();
    // }

    render () {
        return (
            <FirebaseContext.Consumer>
                {firebase => <h1>Start view</h1>}
            </FirebaseContext.Consumer>
        )
    }
};

export default StartView;