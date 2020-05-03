import React from 'react';
import styles from './auth.module.scss';
import close from '../../assets/close.svg';
import LoginForm from './LoginForm';

class Auth extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isLogged: false,
            email: '',
            password: '',
            error: null,
            chosenOption: 0
        }
    }

    successActions = (authUser) => {
        localStorage.setItem('isLogged', true);
        localStorage.setItem('uid', authUser.user.uid);
        this.setState({
            isLogged: true
        });
        this.props.setLogin();
        this.props.store.getProducts(this.props.firebase)
        this.props.closeModal();
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleAuth = () => {
        return this.props.firebase.doCreateUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(authUser => {
                this.successActions(authUser);
            })
            .catch(error => {
                this.setState({ error: error.message });
            });
    }

    handleSingIn = () => {
        return this.props.firebase.doSignInWithEmailAndPassword(this.state.email, this.state.password)
            .then(authUser => {
                this.successActions(authUser);
            })
            .catch(error => {
                this.setState({ error: error.message });
            });
    }

    setOption = (val) => {
        this.setState({
            chosenOption: val
        })
    }

    render () {
        let _error;
        this.state.error ? _error = <p className={styles.error}>{this.state.error}</p> : _error = null;

        let inner;

        this.state.chosenOption === 0 ? 
        inner = <div className={styles.container}>
                    <h3>Nie masz konta?</h3>
                    <a onClick={() => this.setOption(1)}>Zarejestruj się!</a>
                    <hr/>
                    <h3>Już masz konto?</h3>
                    <a onClick={() => this.setOption(2)}>Zaloguj się!</a>
                </div>
        : 
        inner = <LoginForm email={this.state.email}
                            password={this.state.password}
                            handleInput={this.handleInput}
                            chosenOption={this.state.chosenOption}
                            handleAuth={() => {
                                this.state.chosenOption === 1 ? this.handleAuth() : this.handleSingIn()
                            }}>
                    {_error}
                </LoginForm>

        return (
            <div className={styles.modal}>
                <img onClick={this.props.closeModal} 
                    className={styles.close}
                    src={close} alt="close" />
                {inner}
            </div>
        )
    }
}

export default Auth;