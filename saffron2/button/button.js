import React from "react";
import Color from 'color';
import styles from './button.module.css';
import { istyleParser } from '../i';
import c from '../../CustomClass';

import { Icon } from '../../v2';


export default function Button(_props) {

    let props = { ..._props };
    let classes = [styles.button, props.className];

    let bg = "var(--s-button-bg)";
    let bgHover = "var(--s-button-bg-hover)";
    let clr = "var(--s-button-clr)";
    let clrHover = "var(--s-button-clr-hover)";

    if (props.bg) {
        bg = props.bg;
        bgHover = Color(bg).lighten(0.2).hex();
        delete props.bg;
    }

    if (props.color) {
        clr = props.color;
        clrHover = Color(clr).lighten(0.4).hex();
        delete props.color;
    }


    if (props.primary) {
        props.style = {
            ...props.style,
            background: bg,
            color: clr,
            '--button-hover-bs': 'none',
            '--button-hover-bg-color': bgHover,
            '--button-hover-text-color': clrHover,
        }
        delete props.primary;
    } else if (props.link) {
        props.style = {
            ...props.style,
            background: 'none',
            color: bg,
            padding: 0,
            '--button-hover-bs': 'none',
            '--button-hover-bg-color': 'none',
            '--button-hover-text-color': bgHover,
        }
        delete props.link;
    } else {
        props.style = {
            ...props.style,
            background: "transparent",
            color: bg,
            boxShadow: "0 0 0 1.2px " + bg,
            '--button-hover-bs': '0 0 0 1.2px ' + bgHover,
            '--button-hover-bg-color': 'transparent',
            '--button-hover-text-color': bgHover,
        }
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