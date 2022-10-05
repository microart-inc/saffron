import React from "react";
import Io from 'react-icons/io5/index';

export default function Icon({ children, size, style, color, fill }) {
    let icon = null;
    let child = Array.isArray(children) ? children[0] : children;
    if (typeof child !== "string") throw new Error("Icon children must be a string");
    if (Io['Io' + children]) icon = Io['Io' + children];
    let Icon = icon ? icon : () => null;

    let iconStyle = {
        ...style,
        fontSize: size,
        color,
        fill,
        marginBottom: 1
    };

    return (
        <Icon
            style={iconStyle}
        />
    );
}