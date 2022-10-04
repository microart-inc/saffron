import React from "react";
import styles from './button.module.css';
import { istyleParser } from '../i';
import c from '../../CustomClass';

export default function Button(_props) {

    let props = { ..._props };
    let classes = [styles.button, props.className];


    if (props.primary) {
        props.style = {
            ...props.style,
            background: props.bg ?? "rgb(0, 120,255)",
            color: props.color ?? "white",
        }
        props.bg = undefined;
        props.color = undefined;
        props.primary = undefined;
    } else {
        props.style = {
            ...props.style,
            background: "transparent",
            color: props.bg ?? "var(--s-clr)",
            border: "1px solid " + (props.bg ?? "var(--s-clr)")
        }
        props.bg = undefined;
    }


    props = istyleParser(props);

    return (
        <button
            {...props}
            className={c(...classes)}
        >
            {props.children}
        </button>
    )
}