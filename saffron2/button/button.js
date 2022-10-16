import React from "react";
import styles from './button.module.css';
import { istyleParser } from '../i';
import c from '../../CustomClass';

import { Icon } from '../../v2';

export default function Button(_props) {

    let props = { ..._props };
    let classes = [styles.button, props.className];


    if (props.primary) {
        props.style = {
            ...props.style,
            background: props.bg ?? "var(--s-accent)",
            color: props.color ?? "white",
        }
        delete props.bg;
        delete props.color;
        delete props.primary;
    } else {
        props.style = {
            ...props.style,
            background: "transparent",
            color: props.bg ?? "var(--s-clr)",
            border: "1px solid " + (props.bg ?? "var(--s-clr)")
        }
        delete props.bg;
    }


    props = istyleParser(props);


    let CustomIcon;
    if (props.icon) {
        let iconType = props.icon;
        CustomIcon = () => <Icon size={props.iconSize ?? "1.2em"} color={props.iconColor ?? "inherit"}>{iconType}</Icon>;
        delete props.icon;
        delete props.iconSize;
        delete props.iconColor;
    }

    return (
        <button
            {...props}
            className={c(...classes)}
        >
            {CustomIcon && <CustomIcon />}
            {props.children}
        </button>
    )
}