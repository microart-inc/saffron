import React from 'react';
import styles from './Container.module.css';
import c from '../../CustomClass';
import AppContext from '../../AppContext';

export default class Container extends React.Component {

    static contextType = AppContext;

    render() {
        let style = this.props.style;
        if (this.context.isMobile) {
            style =
            {
                ...style,
                maxWidth: "unset",
                padding: "10px",
                ...this.props.mobile
            };
        }
        return (
                <div
                    className={c(styles.container, this.props.className)}
                    style={style}
                >
                    {this.props.children}
                </div>
        );
    }
}