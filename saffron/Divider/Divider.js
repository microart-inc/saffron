import React from 'react';
import AppContext from '../../AppContext';

export default class Divider extends React.Component {
    static contextType = AppContext;
    render() {
        let style = {
            margin: this.props.margin ?? "20px auto",
            width: this.props.width ?? "30%",
            borderTop: "2px solid lightgray",
            borderColor: this.props.color ?? "lightgray",
            borderRadius: "2px",
            ...this.props.style
        };
        if (this.context.isMobile && this.props.mobile) style = { ...style, ...this.props.mobile };
        return (
            <div style={style}/>
        );
    }
}