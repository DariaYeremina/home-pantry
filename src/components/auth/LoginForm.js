import React from 'react';
import styles from './loginForm.module.scss';
import Input from '../input/Input';
import Button from '../button/Button';
import { withFormik } from 'formik';
import * as yup from 'yup';

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

const Form = ({ values, handleInput, handleAuth, children, touched,
    errors, handleSubmit, handleBlur, handleChange, chosenOption }) => (
    <form>
        <h2 className={styles.title}>{
            chosenOption === 1 ? 'Zalóż konto' : 'Wejdź do swojej spiżarni'
        }</h2>
        <Input type={emailParameters.type}
                name={emailParameters.name}
                placeholder={emailParameters.placeholder}
                label={emailParameters.label} 
                value={values.email}
                error={touched.email && errors.email}
                onBlur={handleBlur}
                onChange={e => {handleChange(e); handleInput(e)}}/>
        <Input type={passwordParameters.type}
                name={passwordParameters.name}
                placeholder={passwordParameters.placeholder}
                label={passwordParameters.label} 
                value={values.password}
                error={touched.password && errors.password}
                onBlur={handleBlur}
                onChange={e => {handleChange(e); handleInput(e)}}/>
                {children}
        <div className={styles.actionsWrapper}>
        <Button onClick={handleSubmit} secondary>{
            chosenOption === 1 ? 'Zarejestruj się' : 'Zaloguj się'
        }</Button>
        </div>
    </form>
);

const formikEnhancer = withFormik({
    validationSchema: yup.object().shape({
        email: yup.string()
                .required('Pole jest wymagane')
                .trim()
                .email('Wpisz poprawny email'),
        password: yup.string()
                    .required('Pole jest wymagane')
                    .min(6, 'Minimalna liczba znaków - 6')
    }),
    mapPropsToValues: ({ email, password }) => ({
        email: email,
        password: password
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        props.handleAuth()
            .finally(() => {
                setSubmitting(false)
            })
    },
    validateOnChange: false,
    validateOnMount: true,
    displayName: 'LoginForm'
});

const LoginForm = formikEnhancer(Form);

export default LoginForm;