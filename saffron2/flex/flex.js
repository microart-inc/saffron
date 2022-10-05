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

    delete props.column;
    delete props.row;
    delete props.wrap;
    delete props.justify;
    delete props.align;
    delete props.gapX;
    delete props.gapY;
    delete props.grow;
    delete props.shrink;
    delete props.basis;
    delete props.order;
    delete props.self;

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