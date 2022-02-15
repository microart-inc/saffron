import React from 'react';
import AppContext from '../../AppContext';

export default class Image extends React.Component {
    static contextType = AppContext;
    render() {
        let style = null;
        if (this.props.raw) {
            style = {
                width: this.props.width,
                height: this.props.height,
                aspectRatio: this.props.aspectRatio,
                display: this.props.display,
                padding: this.props.padding,
                ...this.props.style
            };
        } else {
            style = {
                aspectRatio: this.props.aspectRatio,
                height: this.props.height,
                width: this.props.width,
                ...this.props.style,
                backgroundImage: `url('${this.props.src}')`,
                backgroundSize: this.props.size ?? "cover",
                backgroundPosition: this.props.position ?? "center"
            };
        }
        if (this.context.isMobile && this.props.mobile) style = { ...style, ...this.props.mobile };
        if (this.props.raw) {
            return (
                <img
                    src={this.props.src}
                    style={style}
                    alt={this.props.alt ?? ""}
                />
            );
        } else {
            return (
                <div
                    style={style}
                />
            );
        }
    }
}