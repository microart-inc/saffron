import React from "react";
import c from '../../CustomClass';
import styles from './text.module.css';
import { istyleParser } from '../i';
import Highlight from 'react-highlight';
import './vs2015.css';

export default function Text(_props) {
    let props = { ..._props };
    let content = props.children;
    let classes = [styles.text, props.className];
    let Elem = (p) => <span {...p}>{content}</span>;

    /*
    if (props.sub) elem = <sub {...props} className={c(styles.text, props.className)} sub={undefined}>{content}</sub>;
    else if (props.sup) elem = <sup {...props} className={c(styles.text, props.className)} sup={undefined}>{content}</sup>;


    if (props.small) elem = <span {...props} className={c(styles.text, styles.textSmall, props.className)} small={undefined}>{content}</span>
    if (props.xsmall) elem = <span {...props} className={c(styles.text, styles.textXSmall, props.className)} xsmall={undefined}>{content}</span>
    if (props.large) elem = <span {...props} className={c(styles.text, styles.textLarge, props.className)} large={undefined}>{content}</span>
    if (props.xlarge) elem = <span {...props} className={c(styles.text, styles.textXLarge, props.className)} xlarge={undefined}>{content}</span>
    if (props.mono) elem = <span {...props} className={c(styles.text, styles.textMono, props.className)} mono={undefined}>{content}</span>
    else elem = <span {...props} className={c(styles.text, props.className)}>{content}</span>;
*/

    if (props['notrim']) {
        props['notrim'] = undefined;
    } else {
        if (typeof content === 'string') {
            content = content?.trim();
            if (process.env.NODE_ENV !== 'production' && !global._saffron_debug?.text.didShowTrimWarning) {
                console.warn("<Text /> content is trimmed. Use <Text notrim /> to disable this behavior.");
                
            }
        }
    }

    if (props.sub) Elem = (p) => <sub {...p} sub={undefined}>{content}</sub>;
    if (props.sup) Elem = (p) => <sup {...p} sup={undefined}>{content}</sup>;
    if (props.code) {
        Elem = (p) => <Highlight {...p} code={undefined}>{content}</Highlight>;
        if (props.code !== true) {
            classes.push(props.code);
        }
    }

    props = istyleParser(props);
    props.className = c(...classes);

    return <Elem {...props} />
}