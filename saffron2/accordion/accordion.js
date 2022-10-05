import React from "react";
import { Accordion as AccordionExport } from '../../v2';
import styles from './accordion.module.css';
import { IoChevronUp, IoChevronDown } from 'react-icons/io5';
import { istyleParser } from "../i";
import c from '../../CustomClass';

function Item(_props) { return null };

function Accordion(_props) {
    let props = { ..._props };
    let items = getChildren(props);
    let classes = [styles.aHolder, props.className];

    props = istyleParser(props);

    return (
        <div
            {...props}
            className={c(...classes)}
        >
            {items.map((x,i) =>
                <AccordionItem
                    title={x.props.title}
                    open={x.props.open}
                    onClick={x.props.onClick}
                    key={i}
                >
                    {x.props.children}
                </AccordionItem>
            )}
        </div>
    )
}

class AccordionItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open ?? false
        };
    }

    render() {
        return (
            <div className={styles.aWrapper}>
                <div className={styles.aHeader} onClick={() => {
                    if (this.props.onClick) this.props.onClick();
                    else this.setState({ open: !this.state.open })
                }}>
                    {this.props.title}
                    {this.state.open ? <IoChevronUp /> : <IoChevronDown />}
                </div>
                {this.state.open &&
                    <div className={styles.aBody}>
                        {this.props.children}
                    </div>
                }
            </div>
        );
    }
}

function getChildren(props) {
    let _c = Array.isArray(props.children) ? props.children : [props.children];
    let children = _c.filter(x => x.type === AccordionExport.Item);
    props.children = [];
    return children;
}


Accordion.Item = Item;

export default Accordion;