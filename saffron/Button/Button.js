import React from 'react';
import styles from './Button.module.css';
import { withRouter } from 'next/router';

class Button extends React.Component {
    render() {
        var classes = [styles.button];
        if (this.props.primary) classes.push(styles.primary);
        if (this.props.outline) classes.push(styles.outline);
        let style = null;
        if (this.props.style) style = this.props.style;
        if (this.props.className) classes.push(this.props.className);
        if (this.props.shadow) classes.push(styles.shadow);
        if (this.props.invert) classes.push(styles.invert);
        if (this.props.disabled) classes.push(styles.disabled);
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
}

export default withRouter(Button);