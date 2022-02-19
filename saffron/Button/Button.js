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
                onClick={() => {
                    if (!this.props.disabled) {
                        if (this.props.onClick) {
                            this.props.onClick();
                        } else if (this.props.href) {
                            this.props.router.push(this.props.href);
                        }
                    }
                }}
            >{text}</button>
        );
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