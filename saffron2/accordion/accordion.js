import React from "react";
import { Accordion as AccordionExport, Overlap } from '../../v2';
import styles from './accordion.module.css';
import { IoChevronUp, IoChevronDown } from 'react-icons/io5';
import { istyleParser } from "../i";
import c from '../../CustomClass';
import { AnimatePresence, motion } from 'framer-motion';

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
            {items.map((x, i) =>
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
        let Ele = () => {
            return (<IoChevronUp />)
        }
        return (
            <div className={styles.aWrapper}>
                <div className={styles.aHeader} onClick={() => {
                    if (this.props.onClick) this.props.onClick();
                    else this.setState({ open: !this.state.open })
                }}>
                    {this.props.title}
                    <Overlap>
                        <AnimatePresence>
                            {this.state.open ? (
                                <motion.div
                                    key={this.state.open}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <IoChevronUp />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={this.state.open}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <IoChevronDown />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Overlap>
                </div>
                <AnimatePresence>
                    {this.state.open &&
                        <motion.div
                            className={styles.aBody}
                            initial={{ height: 0, paddingBottom: 0 }}
                            animate={{ height: 'auto', paddingBottom: 15 }}
                            exit={{ height: 0, paddingBottom: 0 }}
                            transition={{
                                ease: "easeOut",
                                duration: 0.2
                            }}
                        >
                            {this.props.children}
                        </motion.div>
                    }
                </AnimatePresence>
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