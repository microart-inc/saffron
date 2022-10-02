import React from 'react';
import { IoChevronDown, IoChevronUp, IoIosArrowDown, IoIosArrowUp } from 'react-icons/io5';
import styles from './Dropdown2.module.css'
import Popover from '../Popover/Popover';
import Flex from '../Flex/Flex';
import c from '../../CustomClass';

const paramRegex = /^(?<prop>[a-zA-Z]+)\=?(?<val>[\s\S]*?);(?<content>[\s\S]*)/g;

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    render() {
        let options = [];
        this.props.options?.forEach((option) => {
            let optionParsed = paramRegex.exec(option);
            if (typeof (option) === "string") {
                if (option.startsWith("div;")) {
                    options.push(
                        this.props.altHeader ? (
                            <span className={styles.header} key={option}>{option.substring(4)}</span>
                        ) : (
                            <div className={styles.header2} key={option} >
                                <span>{option.substring(4)}</span>
                                <div />
                            </div >
                        )
                    );
                } else if (optionParsed) {
                    let prop = optionParsed.groups.prop?.toLowerCase().trim();
                    let val = optionParsed.groups.val?.toLowerCase().trim();
                    let content = optionParsed.groups.content;
                    if (prop === "col") {
                        options.push(
                            <span style={{color: val}} className={styles.option} key={option}>{content}</span>
                        );
                    } else if (prop === "bold" || prop === "b" || prop === "strong") {
                        options.push(
                            <span style={{fontWeight: "bold"}} className={styles.option} key={option}>{content}</span>
                        );
                    }
                } else {
                    options.push(
                        <span className={styles.option} key={option}>{option}</span>
                    );
                }
            } else {
                if (option.header) {

                } else {
                    options.push(
                        <span className={styles.option} key={name}>{option.friendlyName ?? option.name}</span>
                    );
                }
            }
        })
        return (
            <Popover
                isOpen={this.state.open}
                onOuterAction={() => {
                    this.setState({ open: false });
                }}
                body={
                    <div className={c(styles.options, this.props.compact ? styles.optionsCompact : "", this.props.dropdownClassName ?? "")}>
                        {options}
                    </div>
                }
            >
                <Flex align="center" gap="3px" className={this.props.className ? c(styles.dropdown, this.props.className) : styles.dropdown}
                    onClick={() => {
                        this.setState({ open: !this.state.open });
                    }}
                >
                    <span className={c(this.props.tinytext ? styles.tinytext : "")}>
                        {this.props.value}
                    </span>
                    <div className={this.props.compact ? styles.buttons : styles.buttonsBig}>
                        <IoChevronUp />
                        <IoChevronDown />
                    </div>
                </Flex>
            </Popover>
        );
    }
}