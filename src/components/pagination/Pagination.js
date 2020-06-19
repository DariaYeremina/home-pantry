import React, { useEffect, useState } from 'react';
import styles from './pagination.module.scss';
import { range } from 'lodash';

const perPageValues = [5, 10, 20];

const Pagination = ({store}) => {
    const [pagesQuanity, setPagesQuantity] = useState(0);

    useEffect(() => {
        setPagesQuantity(Math.ceil(store.products.length / store.amountPerPage))
    }, [store.products, store.amountPerPage]);

    return (
        <div className={styles.wrapper}>
        <div>
            {
                perPageValues.map(el => <span className={store.amountPerPage === el ? styles.amountActive : styles.amount}
                                                key={el}
                                                onClick={() => store.setAmountPerPage(el)}>
                                                {el}
                                        </span>)
            }
        </div>
        <div>
            {
                range(1, pagesQuanity + 1).map(el => <span className={styles.amount}
                                                            key={el}>{el}</span>)
            }
        </div>
    </div>
    )
};

export default Pagination;