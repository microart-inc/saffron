import React from 'react';
import c from '../../CustomClass';
import { istyleParser } from '../i';
import styles from './container.module.css';

export default function Container(_props) {
    let props = { ..._props };
    let classes = [styles.container, props.className];
    props = istyleParser(props);

    if (props.raw) {
        delete props.raw;
    } else {
        classes.push(styles.containerDefault);
    }

    return (
        <div {...props} className={c(...classes)} />
    )
}