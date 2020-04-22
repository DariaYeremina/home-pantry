import React from 'react';
import styles from './product.module.scss';

const Product = ({item, icon}) => (
    <section className={styles.wrapper}>
        <div className={styles.header}>
            <h2 className={styles.title}>{item.title}</h2>
            <div className={styles.iconWrap}>
                <img className={styles.icon} src={icon} alt={item.chosenCategory}/>
            </div>
        </div>
        <div className={styles.content}>
            {`${item.amount} ${item.chosenUnit}`}
        </div>
    </section>
)

export default Product;