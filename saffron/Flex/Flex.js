import React from 'react';
import styles from './Flex.module.css';
import c from '../../CustomClass';
import AppContext from '../../AppContext';

export default class Flex extends React.Component {

    static contextType = AppContext;

    render() {
        let direction = "row";
        if (this.props.column) direction = "column";
        if (this.props.row) direction = "row";

        let style = {
            margin: this.props.margin,
            flexDirection: direction,
            justifyContent: this.props.justify,
            alignItems: this.props.align,
            gap: this.props.gap,
            flexWrap: this.props.wrap ? "wrap": "unset",
            ...this.props.style
        };
        if (this.context.isMobile && this.props.mobile) style = { ...style, ...this.props.mobile };
        return (
            <div
                style={style}
                className={c(styles.flex, this.props.className)}
                onBlur={() => {
                    if (this.props.onBlur) this.props.onBlur();
                }}
                onClick={() => {
                    if (this.props.onClick) this.props.onClick();
                }}
                tabIndex={this.props.tabIndex}
            >
                {this.props.children}
            </div>
        );
    }
}