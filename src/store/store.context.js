import React from 'react';

const StoreContext = React.createContext({
    categories: [],
    products: {},
    isDataLoading: false,
    getProducts: () => {},
    clearProducts: () => {},
    toggleDataLoading: () => {},
    search: () => {},
    resetSearch: () => {},
    getCategories: () => {}
});

export class StoreProvider extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            categories: [],
            searchData: {},
            products: {},
            isDataLoading: false,
            getProducts: this.getProducts,
            clearProducts: this.clearProducts,
            toggleDataLoading: this.toggleDataLoading,
            search: this.search,
            resetSearch: this.resetSearch,
            getCategories: this.getCategories
        }
    }

    getCategories = (firebase) => {
        let get = firebase.getRequest('categories');
        get.on('value', (snapshot) => {
            this.setState({
                categories: [...snapshot.val()]
            })
          });
    };

    getProducts = (firebase) => {
        let uid = localStorage.getItem('uid');
        let get = firebase.getRequest(`products/${uid}`);
        get.on('value', (snapshot) => {
            this.setState({
                products: snapshot.val() ? Object.entries(snapshot.val()) : {},
                searchData: snapshot.val() ? Object.entries(snapshot.val()) : {},
                isDataLoading: true
            })
          });
    };

    clearProducts = () => {
        this.setState ({
            products: {},
            searchData: {}
        });
    };

    toggleDataLoading = (val) => {
        this.setState({
            isDataLoading: val
        });
    }

    search = (query) => {
        let _result = this.state.searchData.filter(el => el[1].title.toLowerCase().includes(query.toLowerCase()));
        this.setState({
            products: _result
        });
    };

    resetSearch = () => {
        this.setState({
            products: this.state.searchData
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