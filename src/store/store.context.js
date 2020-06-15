import React from 'react';

const StoreContext = React.createContext({
    categories: [],
    products: {},
    isDataLoading: false,
    chosenOption: [],
    query: '',
    getProducts: () => {},
    clearProducts: () => {},
    toggleDataLoading: () => {},
    search: () => {},
    resetSearch: () => {},
    getCategories: () => {},
    filter: () => {},
    resetFilter: () => {},
    handleInput: () => {},
    handleChosenOption: () => {}
});

export class StoreProvider extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            categories: [],
            searchData: {},
            products: {},
            chosenOption: [],
            query: '',
            isDataLoading: false,
            getProducts: this.getProducts,
            clearProducts: this.clearProducts,
            toggleDataLoading: this.toggleDataLoading,
            search: this.search,
            resetSearch: this.resetSearch,
            getCategories: this.getCategories,
            filter: this.filter,
            resetFilter: this.resetFilter,
            handleInput: this.handleInput,
            handleChosenOption: this.handleChosenOption
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

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleChosenOption = (e) => {
        this.setState(prevState => ({
            chosenOption: prevState.chosenOption.find(el => el === e)
                            ? prevState.chosenOption.filter(el => el !== e)
                            : [...prevState.chosenOption, e]
        }))
    }

    filterCallback = (el) => {
        return this.state.chosenOption.includes(el[1].chosenCategory);
    }

    searchCallback = (el) => {
        return el[1].title.toLowerCase().includes(this.state.query.toLowerCase());
    }

    filterProductsCallback = (el) => {
        let searchResult = this.state.query ? this.searchCallback(el) : true;
        let filterResult = this.state.chosenOption.length > 0 ? this.filterCallback(el) : true;
        return searchResult && filterResult;
    }

    filter = () => {
        let result = this.state.searchData.filter(el => this.filterProductsCallback(el));
        this.setState({
            products: result
        });
    }    

    resetSearch = () => {
        let filterResult = this.state.chosenOption.length > 0 ? this.state.searchData.filter(el => this.filterCallback(el)) 
                            : this.state.searchData;
        this.setState({
            products: filterResult,
            query: ''
        });
    }

    resetFilter = () => {
        let searchResult = this.state.query ? this.state.searchData.filter(el => this.searchCallback(el))
                            : this.state.searchData;
        this.setState({
            products: searchResult,
            chosenOption: []
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