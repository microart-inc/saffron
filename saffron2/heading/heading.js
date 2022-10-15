import React from "react";
import styles from './heading.module.css';
import c from '../../CustomClass';
import { istyleParser } from "../i";

export default function Heading(_props) {
    let elem = null;
    let props = {..._props};
    props.style = {...props.style};

    if (props.margin === true) props.margin = "true";
    else if (props.margin) props.style.margin = props.margin;

    if (props.padding === true) props.padding = "true";
    else if (props.padding) props.style.padding = props.padding;

    if (props.line) {
        props.style.borderBottom = "1px solid rgba(0,0,0,0.2)";
        props.style.paddingBottom = "0.5rem";
        delete props.line;
    }

    props = istyleParser(props);

    if (props.h2) elem = <h2 {...props} className={c(styles.h2, props.className)} h2={undefined}>{props.children}</h2>;
    else if (props.h3) elem = <h3 {...props} className={c(styles.h3, props.className)} h3={undefined}>{props.children}</h3>;
    else if (props.h4) elem = <h4 {...props} className={c(styles.h4, props.className)} h4={undefined}>{props.children}</h4>;
    else if (props.h5) elem = <h5 {...props} className={c(styles.h5, props.className)} h5={undefined}>{props.children}</h5>;
    else if (props.h6) elem = <h6 {...props} className={c(styles.h6, props.className)} h6={undefined}>{props.children}</h6>;
    else elem = <h1 {...props} className={c(styles.h1, props.className)} h1={undefined}>{props.children}</h1>;

    return elem;
}