import React from 'react';
import styles from './startView.module.scss';
import FirebaseContext from '../../Firebase/context';
import Product from '../../components/product/Product';
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
                products: Object.entries(snapshot.val())
            })
          });
    }

    objectIsEmpty = () => {
        return Object.keys(this.state.products).length === 0 && this.state.products.constructor;
    }

    findIconName = (category) => {
        for (let [key, value] of Object.entries(iconsNames)) {
            if (value.title === category) {
                return value.file;
            }
        }
    }

    componentDidMount () {
        this.getProducts();
    }

    render () {
        let condition = this.objectIsEmpty();
        
        return (
            <FirebaseContext.Consumer>
                {firebase => <div className={styles.wrapper}>
                                {  condition ? <h1>Nie masz produktów! Zaloguj się i dodaj!</h1> : 
                                    this.state.products.map((el, index) => <Product key={index} 
                                                                                    firebase={firebase}
                                                                                    id={el[0]}
                                                                                    item={el[1]} 
                                                                                    icon={this.findIconName(el[1].chosenCategory)}/>)
                                }
                             </div>
                }
            </FirebaseContext.Consumer>
        )
    }
};

export default StartView;