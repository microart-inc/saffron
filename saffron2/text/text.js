import React from "react";
import c from '../../CustomClass';
import styles from './text.module.css';
import { istyleParser } from '../i';
import Highlight from 'react-highlight';
import './vs2015.css';
import moment from 'moment';

const formatters = [
    {
        name: 'currency',
        formatter: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }),
    },
    {
        name: 'date',
        formatter: {
            format: (date) => moment(date).format('MMM Do, YYYY'),
        }
    },
    {
        name: 'time',
        formatter: {
            format: (date) => moment(date).format('h:mm A'),
        }
    },
    {
        name: 'datetime',
        formatter: {
            format: (date) => moment(date).format('MMM Do, YYYY h:mm A'),
        }
    },
    {
        name: 'number',
        formatter: new Intl.NumberFormat('en-US'),
    },
    {
        name: 'percent',
        formatter: new Intl.NumberFormat('en-US', {
            style: 'percent',
        }),
    },
    {
        name: 'bytes',
        formatter: {
            format: (bytes) => {
                const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                if (bytes == 0) return '0 Byte';
                const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
                return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
            }
        }
    }
];

export default function Text(_props) {
    let props = { ..._props };
    let content = props.children;
    let classes = [styles.text, props.className];

    if (shouldFormat(props)) {
        content = tryFormat(props);
    }

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
        delete props['notrim'];
    } else {
        if (typeof content === 'string') {
            content = content?.trim();
            if (process.env.NODE_ENV !== 'production' && !global._saffron_debug?.text.didShowTrimWarning) {
                //console.warn("<Text /> content is trimmed. Use <Text notrim /> to disable this behavior.");
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

    props = istyleParser(props, true);
    props.className = c(...classes);

    delete props.formatter;

    return <Elem {...props} />
}

function shouldFormat(props) {
    return props.formatter || formatters.some(f => props[f.name]);
}

function tryFormat(props) {
    let formatter = props.formatter;
    if (!formatter) {
        formatter = getFormatter(props);
    } else {
        formatter = {
            format: formatter,
        }
    }

    if (formatter) {
        return formatter.format(props.children);
    }

    delete props.formatter;
    return props.children;
}

function getFormatter(props) {
    let f = formatters.find(f => props[f.name]);
    delete props[f.name];
    return f.formatter;
}