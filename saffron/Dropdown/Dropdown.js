import React from 'react';
import TextInput from '../TextInput/TextInput';
import Flex from '../Flex/Flex';
import Divider from '../Divider/Divider';
import styles from './Dropdown.module.css';
import {
    IoChevronUp,
    IoChevronDown
} from 'react-icons/io5';
import c from '../../CustomClass';

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDropdown: false
        }
    }

    closeDropdown = () => {
        if (!this.childrenHasFocus) {
            this.setState({
                showDropdown: false
            });

        }
    }

    render() {
        let dropdownStyle = this.state.showDropdown ? {
            display: "flex",
            opacity: "1"
        } : {
            display: "none",
            opacity: "0"
        };
        let options = [];




        for (var i in this.props.options) {
            let option = this.props.options[i];
            if (option === "---") {
                options.push(
                    <Divider
                        key={i}
                        style={{
                            borderTop: "1px solid",
                            borderColor: "rgb(234,234,234)",
                            width: "100%",
                            margin: "8px 0px"
                        }}
                    />
                );
            } else {
                let currentIndex = i;
                options.push(
                    <span
                        key={i}
                        onMouseDown={() => {
                            this.childrenHasFocus = true;
                        }}
                        onClick={(x) => {
                            this.childrenHasFocus = false;
                            this.dropdownItemSelected = true;
                            this.setState({
                                showDropdown: false
                            });
                            if(this.props.onClick){
                                this.props.onClick(currentIndex);
                            }
                        }}
                        className={styles.dropdownItem}
                    >
                        {option}
                    </span>
                );
            }
        }

        return (
            <Flex
                column
                tabIndex="0"
                onBlur={this.closeDropdown}
                onClick={() => {
                    if (!this.dropdownItemSelected && !this.props.disabled) {
                        this.setState({
                            showDropdown: true
                        });
                    } else {
                        this.dropdownItemSelected = false;
                    }
                }}
                className={this.props.disabled ? c(styles.container, styles.disabled) : styles.container}
                style={this.props.style}
                mobile={this.props.mobile}
            >
                <Flex
                    row
                    align="center"
                >
                    <span className={styles.dropdownText}>{this.props.value ?? "Saffron Dropdown"}</span>
                    <Flex
                        column
                        className={styles.arrowContainer}
                    >
                        <IoChevronUp className={styles.dropdownArrow} />
                        <IoChevronDown className={styles.dropdownArrow} />
                    </Flex>
                </Flex>
                <Flex
                    className={styles.dropdownContainer}
                    style={{
                        transition: "opacity 0.2s linear",
                        ...dropdownStyle
                    }}
                >
                    <Flex
                        column
                        align="stretch"
                        className={styles.dropdown}
                    >
                        {options}
                    </Flex>
                </Flex>
            </Flex>
        );
    }
}