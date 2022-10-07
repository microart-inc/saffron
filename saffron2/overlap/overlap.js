import React from "react";
import styles from './overlap.module.css';

export default function Overlap({ children }) {
    return (
        <div className={styles.default}>
            {children}
        </div>
    )
}