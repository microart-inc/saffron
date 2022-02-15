import React from 'react';
import { IoCheckmark } from 'react-icons/io5';
import Flex from '../Flex/Flex';
import styles from './Checkbox.module.css';
import c from '../../CustomClass';

export default class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked
        }
    }

    render() {

        let direction = this.props.direction ?? "left";

        let checkbox = this.state.checked ? c(styles.checkbox, styles.checked) : styles.checkbox;
        checkbox = this.props.disabled ? c(checkbox, styles.disabled) : checkbox;
        return (
            <Flex
                row
                align="center"
                gap="0.3em"
                style={this.props.style}
            >
                {
                    direction === "right" ? (
                        this.props.children ??
                        (
                            <span className={this.props.faint ? styles.faint : null}>
                                {this.props.text}
                            </span>
                        )
                    ) : null
                }


                <div
                    style={this.props.checkboxStyle}
                    className={checkbox}
                    onClick={() => {
                        if (this.props.disabled) return;
                        if (this.props.onClick) this.props.onClick(!this.state.checked);
                        this.setState({
                            checked: !this.state.checked
                        })
                    }}
                >
                    <IoCheckmark
                        className={styles.checkmark}
                        style={{
                            fontSize: this.props.checkmarkSize
                        }}
                    />
                </div>


                {
                    direction !== "right" ? (
                        this.props.children ??
                        (
                            <span className={this.props.faint ? styles.faint : null}>
                                {this.props.text}
                            </span>
                        )
                    ) : null
                }
            </Flex >
        );
    }
}