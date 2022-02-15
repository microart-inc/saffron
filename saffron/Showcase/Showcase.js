import React from 'react';
import styles from './Showcase.module.css';
import AppContext from '../../AppContext';
import c from '../../CustomClass';

export default class Showcase extends React.Component {

    static contextType = AppContext;

    render() {
        let style = {
            aspectRatio: this.props.aspectRatio,
            background: this.props.background,
            margin: this.props.margin,
            ...this.props.style
        };
        if (this.context.isMobile && this.props.mobile) style = {...style,...this.props.mobile};
        return (
            <div
                style={style}
                className={c(styles.showcase, this.props.className)}
            >
                {this.props.children}
            </div>
        );
    }
}