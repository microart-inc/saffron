import React from "react";

export default function CardFooter(props) {
    if (typeof props.children !== "string") throw new (() => {
        this.message = "CardFooter only accepts string as children";
        this.name = "CardFooterError";
    })
    return null;
}