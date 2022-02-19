import React from "react";
import styles from "./Hint.module.css";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import "./Hint.global.css";

export default class Hint extends React.Component {
    texted(text) {
        return (<span className={styles.hint}>{text}</span>);
    }

    render() {
        let html = this.texted("Saffron Hint");
        if (this.props.text) html = this.texted(this.props.text);
        if (this.props.content) html = this.props.content;
        return (
            <Tooltip
                html={html}
                arrow={this.props.arrow ?? false}
                position={this.props.position ?? "bottom"}
                trigger={this.props.trigger ?? "mouseenter"}
                delay={this.props.delay ?? 0}
                hideDelay={this.props.hideDelay ?? 0}
                duration={this.props.duration ?? 500}
                distance={this.props.distance ?? 3}
                size={this.props.size ?? "small"}
                theme={this.props.theme ?? "light"}
                style={this.props.style}
            >
                {this.props.children}
            </Tooltip>
        );
    };
}