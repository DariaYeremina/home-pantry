import React from 'react';
import styles from './addItem.module.scss';
import Button from '../button/Button';
import Input from '../input/Input';
import Select from '../select/Select';
import { withFormik } from 'formik';
import * as yup from 'yup';

const titleParameters = {
    name: 'title',
    placeholder: 'Wpisz nazwę',
    label: 'Nazwa',
};

const selectParameters = {
    name: 'chosenCategory',
    label: 'Kategoria',
};

const unitParameters = {
    name: 'chosenUnit',
    label: 'Wymiar',
};

const amountParameters = {
    name: 'amount',
    placeholder: 'Wpisz ilość',
    label: 'Ilość',
};

const buttonTitle = {
    add: 'Dodaj',
    edit: 'Zapisz zmiany'
};

const Item = ({values, action, handleInput, writeAction, categories, units,
    touched, errors, handleSubmit, handleBlur, handleChange,}) => (
    <form>
        <Input name={titleParameters.name}
                    placeholder={titleParameters.placeholder}
                    label={titleParameters.label} 
                    value={values.title}
                    error={touched.title && errors.title}
                    onBlur={handleBlur}
                    onChange={e => {handleChange(e); handleInput(e)}}/>
        <Select items={categories}
                name={selectParameters.name}
                label={selectParameters.label}
                chosen={values.chosenCategory}
                error={touched.chosenCategory && errors.chosenCategory}
                onBlur={handleBlur}
                onChange={e => {handleChange(e); handleInput(e)}} />
        <Input name={amountParameters.name}
                    placeholder={amountParameters.placeholder}
                    label={amountParameters.label} 
                    value={values.amount}
                    error={touched.amount && errors.amount}
                    onBlur={handleBlur}
                    onChange={e => {handleChange(e); handleInput(e)}}/>
        <Select items={units}
                name={unitParameters.name}
                label={unitParameters.label}
                chosen={values.chosenUnit}
                error={touched.chosenUnit && errors.chosenUnit}
                onBlur={handleBlur}
                onChange={e => {handleChange(e); handleInput(e)}} />
        <div className={styles.modalActions}>
            <Button onClick={handleSubmit}>{buttonTitle[action]}</Button>
        </div>
    </form>
);

const formikEnhancer = withFormik({
    validationSchema: yup.object().shape({
        title: yup.string()
                .required('Pole jest wymagane')
                .trim()
                .matches(/[A-ZĄĘÓŻŹŃŁąęóżźńł0-9]/, {message: 'Wprowadź litery lub cyfry'}),
        chosenCategory: yup.string()
                        .required('Pole jest wymagane'),
        amount: yup.string()
                    .required('Pole jest wymagane')
                    .matches(/^[0-9]+((,|.)[0-9]{1,2})?$/, {message: 'Pole moze być liczbą z kropką lub przecinkiem'}),
        chosenUnit: yup.string()
                    .required('Pole jest wymagane')
    }),
    mapPropsToValues: ({ title, chosenCategory, amount, chosenUnit }) => ({
        title: title,
        chosenCategory: chosenCategory,
        amount: amount,
        chosenUnit: chosenUnit
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        props.writeAction()
            .finally(() => {
                setSubmitting(false)
            })
    },
    validateOnChange: false,
    validateOnMount: true,
    enableReinitialize: true,
    displayName: 'ItemForm'
});

const ItemForm = formikEnhancer(Item);

export default ItemForm;