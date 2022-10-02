import React from "react";
import styles from './card.module.css';
import c from '../../CustomClass';
import { istyleParser } from '../istyle';

export default function Card(_props) {
    let props = { ..._props };
    let classes = [styles.card, props.className];

    if(props.min) {
        classes.push(styles.min);
        props.min = undefined;
    }

    props = istyleParser(props);

    return (
        <div {...props} className={c(...classes)}>
            {props.children}
        </div>
    )
}