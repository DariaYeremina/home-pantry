import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import styles from './header.module.scss';
import Button from '../button/Button';
import Auth from '../auth/Auth';
import AddItem from '../addItem/AddItem';
import FirebaseContext from '../../Firebase/context';

class Header extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            isModalOpen: false,
            authButtonTitle: localStorage.getItem('isLogged') === 'true' ? 'Wyjdź' : 'Wejdź',
            isAddModalOpen: false
        }
    }

    openModal = () => {
        this.setState({
            isModalOpen: true
        })
    }

    closeModal = () => {
        this.setState({
            isModalOpen: false
        })
    }

    openAddModal = () => {
        this.setState({
            isAddModalOpen: true
        })
    }

    closeAddModal = () => {
        this.setState({
            isAddModalOpen: false
        })
    }

    setLogin = () => {
        this.setState({
            authButtonTitle: 'Wyjdź'
        })
    }

    setLogout = () => {
        this.setState({
            authButtonTitle: 'Wejdź'
        })
    }

    render () {
        return (
            <>
            <header className={styles.header}>
                <img src={logo} 
                    alt="Logo"
                    className={styles.logo} />
                <nav className={styles.nav}>
                    <NavLink to="/"
                            exact
                            className={styles.navLink}
                            activeClassName={styles.navLinkActive}>Spiżarnia</NavLink>
                    <NavLink to="/list"
                            className={styles.navLink}
                            activeClassName={styles.navLinkActive}>Lista zakupów</NavLink>
                    {localStorage.getItem('isLogged') === 'true' && <Button onClick={this.openAddModal} secondary>Dodaj produkt</Button>}
                </nav>
                <div>
                    <Button onClick={this.openModal}>{this.state.authButtonTitle}</Button>
                </div>
            </header>
            { this.state.isModalOpen && 
                <FirebaseContext.Consumer>
                    {firebase => <Auth firebase={firebase} 
                                        setLogin={this.setLogin} 
                                        setLogout={this.setLogout}
                                        closeModal={this.closeModal} />}
                </FirebaseContext.Consumer> }
            
            { this.state.isAddModalOpen && 
                <FirebaseContext.Consumer>
                    {firebase => <AddItem firebase={firebase} 
                                          closeModal={this.closeAddModal}/>}
                </FirebaseContext.Consumer> }
            </>
        )
    }
};

export default Header;
