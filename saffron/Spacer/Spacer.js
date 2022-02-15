import React from 'react';
import styles from './Spacer.module.css';

export default class Spacer extends React.Component {
    render() {
        if (this.props.size) {
            let style = {};
            if (this.props.horizontal){
                style.marginLeft = this.props.size;
            } else {
                style.marginTop = this.props.size;
            }
            return (
                <div
                    style={style}
                />
            );
        } else {
            return (
                <div className={this.props.horizontal ? styles.spacerx : styles.spacer} />
            );
        }
    }
}