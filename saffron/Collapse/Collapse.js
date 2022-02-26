import React from "react";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";
import Flex from "../Flex/Flex";
import styles from './Collapse.module.css';
import c from '../../CustomClass';

export default class Collapse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.opened ?? false,
        };
    }

    render() {
        let open = this.props.open ?? this.state.open;
        let wrapperStyle = open ? { ...this.props.style, ...this.props.openStyle } : this.props.style;
        let headerStyle = open ? { ...this.props.headerStyle, ...this.props.openHeaderStyle } : this.props.headerStyle;
        
        let contentType = styles.borderLeft;
        if (this.props.contentType === "block") contentType = styles.contentBlock;
        if (this.props.contentType === "line") contentType = styles.borderLeft;
        if (this.props.contentType === "none") contentType = "";
        return (
            <div opened={open ? "opened" : null} style={wrapperStyle} className={styles.wrapper}>
                <Flex style={headerStyle} className={c(styles.header, this.props.noHoverEffect ? "" : styles.headerHover)} align="center" gap="0.8em" onClick={() => {
                    this.setState({ open: !this.state.open });
                }}>
                    {open ? (
                        <IoChevronDown />
                    ) : (
                        <IoChevronForward style={{ color: "gray" }} />
                    )}
                    {this.props.title ?? "Saffron Collapse"}
                </Flex>
                {open ? (
                    <Flex className={this.props.contentTypeOverride ?? contentType}>
                        {this.props.children}
                    </Flex>
                ) : null}
            </div>
        );
    }
}