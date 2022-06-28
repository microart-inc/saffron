import React from 'react';
import styles from './Button.module.css';
import { withRouter } from 'next/router';
import Hint from '../Hint/Hint';

class Button extends React.Component {
    button() {
        var classes = [styles.button];
        if (this.props.primary) classes.push(styles.primary);
        if (this.props.outline) classes.push(styles.outline);
        let style = null;
        if (this.props.style) style = this.props.style;
        if (this.props.className) classes.push(this.props.className);
        if (this.props.shadow) classes.push(styles.shadow);
        if (this.props.invert) classes.push(styles.invert);
        if (this.props.disabled) classes.push(styles.disabled);
        if (this.props.min) classes.push(styles.min);
        let text = this.props.text ? this.props.text : this.props.children;
        return (
            <button
                className={classes.join(' ')}
                primary="primary"
                style={style}
                onClick={(e) => this.doClick(e, false)}
                onMouseDown={(e) => this.doClick(e, true)}
                ref={(ref) => { if (this.props.xRef) this.props.xRef(ref); }}
            >{text}</button>
        );
    }

    doClick = (e, isAux) => {
        if (!this.props.disabled) {
            // Make sure button is enabled
            if (this.props.onClick) {
                // If a callback is provided, call it
                if (isAux && e.button === 1) {
                    // If the click is an aux click, check wether it is wanted
                    if (this.props.captureAux) {
                        this.props.onClick(e);
                    }
                } else {
                    this.props.onClick(e);
                }
            } else if (this.props.href) {
                // No callback provided, but a href is, so redirect to the href
                if (!isAux && e.button === 0 && e.ctrlKey === true) {
                    window.open(this.props.href);
                } else if (isAux && e.button === 1) {
                    window.open(this.props.href);
                } else if (!isAux) {
                    this.props.router.push(this.props.href);
                }
            }
        }
    }

    render() {
        return (this.props.hint ?
            (
                <Hint
                    content={this.props.hint}
                >
                    {this.button()}
                </Hint>
            ) :
            this.button()
        );
    }
}

export default withRouter(Button);