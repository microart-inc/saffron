import React from "react";
import { istyleParser } from "../i";

export default function Line(_props) {
    let props = { ..._props };

    props.style = props.style ?? {};

    props.style.width = "100%";
    props.style.borderTop = "none";
    props.style.margin = "0px";

    props = istyleParser(props);

    return (
        <hr
            {...props}
        />
    )
}