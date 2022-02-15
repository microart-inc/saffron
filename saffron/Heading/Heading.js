import React from 'react';
import styles from './Heading.module.css';
import c from '../../CustomClass';
import AppContext from '../../AppContext';

export default class Heading extends React.Component {
    static contextType = AppContext;
    render() {
        let margin = this.props.margin ? styles.margin : styles.nomargin;
        let classes = c(
            margin
        );
        let style = {
            fontSize: this.props.fontSize,
            fontFamily: this.props.font,
            ...this.props.style
        };
        if (this.context.isMobile && this.props.mobile) style = {...style, ...this.props.mobile};
        if (this.props.h1) {
            return (
                <h1 className={classes} style={style}>
                    {this.props.text ? this.props.text : this.props.children}
                </h1>
            );
        }
        if (this.props.h2) {
            return (
                <h2 className={classes} style={style}>
                    {this.props.text ? this.props.text : this.props.children}
                </h2>
            );
        }
    }
}