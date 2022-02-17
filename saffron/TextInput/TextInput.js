import React from 'react';
import styles from './TextInput.module.css';

export default class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value ? this.props.value : ""
        };
    }

    onChange = (x) => {
        if (this.props.onChange) {
            this.props.onChange(x);
        }
        this.setState({
            value: x.target.value
        });
    }

    render() {
        var classes = [styles.textinput];
        if (this.props.disabled) classes.push(styles.disabled);
        let style = null;
        if (this.props.style) {
            style = this.props.style;
        }
        if (this.props.className) {
            classes.push(this.props.className);
        }
        style = {
            ...style,
            ...(this.props.min ? ({
                minHeight: "35px"
            }) : null)
        }
        var showPlaceholder = this.props.value ? this.props.value === "" : this.state.value === "";
        classes.push(styles.transparent);
        return (
            <div className={styles.placeholder} style={this.props.rootStyle}>
                {showPlaceholder ? (
                    <div className={styles.center}>
                        {this.props.placeholder ?
                            this.props.placeholder : (
                                <span className={styles.sampleplaceholder}>Saffron TextInput</span>
                            )
                        }
                    </div>
                ) : null}
                <input
                    type={this.props.type ?? "text"}
                    ref={this.props.saffronRef}
                    className={classes.join(' ')}
                    style={style}
                    onChange={(x) => {
                        this.onChange(x);
                    }}
                    onClick={() => {
                        if (this.props.onClick) this.props.onClick();
                    }}
                    value={this.props.value ?? this.state.value}
                    disabled={this.props.disabled}
                    onFocus={(e) => {
                        if (this.props.onFocus) this.props.onFocus(e);
                    }}
                />
            </div>
        );
    }
}