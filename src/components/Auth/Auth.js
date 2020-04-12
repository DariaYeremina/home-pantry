import React from 'react';
import styles from './auth.module.scss';
import close from '../../assets/close.svg';
import Input from '../input/Input';
import Button from '../button/Button';

const emailParameters = {
    type: 'email',
    name: 'email',
    placeholder: 'Wpisz email',
    label: 'Email',
};

const passwordParameters = {
    type: 'password',
    name: 'password',
    placeholder: 'Wpisz hasło',
    label: 'Hasło',
};

class Auth extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isLogged: false,
            email: '',
            password: '',
            error: null
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleAuth = () => {
        this.props.firebase.doCreateUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(authUser => {
                localStorage.setItem('isLogged', true);
                this.setState({
                    isLogged: true
                })
                this.props.setLogin();
                this.props.closeModal();
            })
            .catch(error => {
                this.setState({ error: error });
            });
    }

    handleSingIn = () => {
        this.props.firebase.doSignInWithEmailAndPassword(this.state.email, this.state.password)
            .then(authUser => {
                localStorage.setItem('isLogged', true);
                this.setState({
                    isLogged: true
                })
                this.props.setLogin();
                this.props.closeModal();
            })
            .catch(error => {
                this.setState({ error: error });
            });
    }
    
    handleLogout = () => {
        this.props.firebase.doSignOut()
            .then(() => {
                localStorage.removeItem('isLogged');
                this.setState({
                    isLogged: false
                });
                this.props.setLogout();
            })
    }

    render () {
        let inner;
        localStorage.getItem('isLogged') === 'true' ? 
        inner = <div className={styles.wrapper}>
                    <Button onClick={this.handleLogout} secondary>Wyloguj się</Button>
                </div>
        : 
        inner = <>
                    <h2 className={styles.title}>Wejdź do swojej spiżarni</h2>
                    <Input type={emailParameters.type}
                            name={emailParameters.name}
                            placeholder={emailParameters.placeholder}
                            label={emailParameters.label} 
                            value={this.state.email}
                            onChange={this.handleInput}/>
                    <Input type={passwordParameters.type}
                            name={passwordParameters.name}
                            placeholder={passwordParameters.placeholder}
                            label={passwordParameters.label} 
                            value={this.state.password}
                            onChange={this.handleInput}/>
                    <div className={styles.modalActions}>
                        <Button onClick={this.handleAuth}>Zarejestruj się</Button>
                        <Button onClick={this.handleSingIn} secondary>Zaloguj się</Button>
                    </div>
                </>

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