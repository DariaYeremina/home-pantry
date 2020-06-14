import React from 'react';
import styles from './startView.module.scss';
import FirebaseContext from '../../Firebase/context';
import Product from '../../components/product/Product';
import Loader from '../../components/loader/Loader';
import FiltersBar from '../../components/filtersBar/FiltersBar';
import bakery from '../../assets/categories/bakery.svg';
import cake from '../../assets/categories/cake.svg';
import cheese from '../../assets/categories/cheese.svg';
import drinks from '../../assets/categories/drinks.svg';
import fish from '../../assets/categories/fish.svg';
import fruits from '../../assets/categories/fruits.svg';
import ketchup from '../../assets/categories/ketchup.svg';
import meat from '../../assets/categories/meat.svg';
import vegetables from '../../assets/categories/vegetables.svg';

const iconsNames = {
    vegetables: {
        title: 'Warzywa',
        file: vegetables
    },
    fruits: {
        title: 'Owoce',
        file: fruits
    },
    meat: {
        title: 'Mięso',
        file: meat
    },
    fish: {
        title: 'Ryba',
        file: fish
    },
    bakery: {
        title: 'Bakalia',
        file: bakery
    },
    cake: {
        title: 'Słodycze',
        file: cake
    },
    cheese: {
        title: 'Sery i mleko',
        file: cheese
    },
    ketchup: {
        title: 'Sosy',
        file: ketchup
    },
    drinks: {
        title: 'Napoje',
        file: drinks
    }
}

class StartView extends React.Component {

    objectIsEmpty = () => {
        return Object.keys(this.props.store.products).length === 0 && this.props.store.products.constructor;
    }

    findIconName = (category) => {
        for (let [key, value] of Object.entries(iconsNames)) {
            if (value.title === category) {
                return value.file;
            }
        }
    }

    isLogged = () => { return localStorage.getItem('isLogged') };

    componentDidMount () {
        if (this.isLogged()) {
            this.props.store.getProducts(this.props.firebase);
        } else {
            this.props.store.toggleDataLoading(true);
        }
        this.props.store.getCategories(this.props.firebase);
    }

    render () {
        let condition = this.objectIsEmpty();
        let headingText = this.isLogged() ? 'Nie masz produktów' : 'Zaloguj się żeby zobaczyć swoje produkty';

        return ( 
            <FirebaseContext.Consumer>
                {firebase => <div className={styles.wrapper}>
                                {this.isLogged() && <FiltersBar store={this.props.store} />}
                                <div className={styles.inner}>
                                    {  this.props.store.isDataLoading ?
                                        condition ? <h1 className={styles.title}>{headingText}</h1> : 
                                        this.props.store.products.map((el, index) => <Product key={index} 
                                                                                        firebase={firebase}
                                                                                        store={this.props.store}
                                                                                        id={el[0]}
                                                                                        item={el[1]} 
                                                                                        icon={this.findIconName(el[1].chosenCategory)}/>)
                                        : <Loader />
                                    }
                                </div>
                             </div>
                }
            </FirebaseContext.Consumer>
        )
    }
};

export default StartView;