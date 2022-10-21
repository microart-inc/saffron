import React from 'react';
import c from '../../CustomClass';
import { istyleParser } from '../i';
import styles from './container.module.css';

import { Nav } from '../../v2';

export default function Container(_props) {
    let props = { ..._props };
    let classes = [styles.container, props.className];
    props = istyleParser(props);

    if (props.raw) {
        delete props.raw;
    } else {
        classes.push(styles.containerDefault);
    }

    if (Array.isArray(props.children)) {
        props.children.forEach(x => {
            ensure_nav_not_in_container(x, Nav);
            if (x && x.type == React.Fragment) {
                x.props.children.forEach(y => {
                    ensure_nav_not_in_container(y, Nav);
                });
            }
        });
    } else {
        if (props.children.type == React.Fragment) {
            if (Array.isArray(props.children.props.children)) {
                props.children.props.children.forEach(x => {
                    ensure_nav_not_in_container(x, Nav);
                });
            } else {
                ensure_nav_not_in_container(props.children.props.children, Nav);
            }
        } else {
            ensure_nav_not_in_container(props.children, Nav);
        }
    }

    return (
        <div {...props} className={c(...classes)} />
    )
}

class NavInContainerError extends Error {
    constructor(message) {
        super(message);
        this.name = "NavInContainerError";
    }
}

const ensure_nav_not_in_container = (container, nav) => {
    if (container && container.type === nav) {
        throw new NavInContainerError("Nav component cannot be used inside a container");
    }
}