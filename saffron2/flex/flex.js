import React from "react";
import { istyleParser } from "../i";
import styles from './flex.module.css';

export default function Flex(_props) {

    let props = { ..._props };

    props.style = {
        ...props.style,
        ...(props.column && { flexDirection: 'column' }),
        ...(props.row && { flexDirection: 'row' }),
        ...(props.wrap && { flexWrap: 'wrap' }),
        ...(props.justify && { justifyContent: props.justify }),
        ...(props.align && { alignItems: props.align }),
        ...(props.gapX && { columnGap: props.gapX }),
        ...(props.gapY && { rowGap: props.gapY }),
        ...(props.grow && { flexGrow: props.grow }),
        ...(props.shrink && { flexShrink: props.shrink }),
        ...(props.basis && { flexBasis: props.basis }),
        ...(props.order && { order: props.order }),
        ...(props.self && { alignSelf: props.self }),
    };

    props.column = undefined;
    props.row = undefined;
    props.wrap = undefined;
    props.justify = undefined;
    props.align = undefined;
    props.gapX = undefined;
    props.gapY = undefined;
    props.grow = undefined;
    props.shrink = undefined;
    props.basis = undefined;
    props.order = undefined;
    props.self = undefined;

    props = istyleParser(props);

    return (
        <div
            {...props}
            className={styles.default}
        >
            {props.children}
        </div>
    )
}