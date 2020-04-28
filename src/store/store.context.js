import React from 'react';

const StoreContext = React.createContext({
    products: {},
    isDataLoading: false,
    getProducts: () => {},
    clearProducts: () => {},
    toggleDataLoading: () => {}
});

export class StoreProvider extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            products: {},
            isDataLoading: false,
            getProducts: this.getProducts,
            clearProducts: this.clearProducts,
            toggleDataLoading: this.toggleDataLoading
        }
    }

    getProducts = (firebase) => {
        let uid = localStorage.getItem('uid');
        let get = firebase.getRequest(`products/${uid}`);
        get.on('value', (snapshot) => {
            this.setState({
                products: Object.entries(snapshot.val()),
                isDataLoading: true
            })
          });
    };

    clearProducts = () => {
        this.setState ({
            products: {} 
        });
    };

    toggleDataLoading = (val) => {
        this.setState({
            isDataLoading: val
        });
    }

    render () {
        return (
            <StoreContext.Provider value={this.state}>
                {this.props.children}
            </StoreContext.Provider>
        )
    }
};

export const StoreConsumer = StoreContext.Consumer;