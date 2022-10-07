import React from "react";
import { v4 } from "uuid";
import c from '../../CustomClass';

const styleMap = [
    ["bold", "font-weight", "bold"],
    ["italic", "font-style", "italic"],
    ["underline", "text-decoration", "underline"],
    ["strike", "text-decoration", "line-through"],
    ["uppercase", "text-transform", "uppercase"],
    ["lowercase", "text-transform", "lowercase"],
    ["capitalize", "text-transform", "capitalize"],
    ["mono", "font-family", "monospace"],
    ["width", "width"],
    ["height", "height"],
    ["maxWidth", "max-width"],
    ["maxHeight", "max-height"],
    ["minWidth", "min-width"],
    ["minHeight", "min-height"],
    ["color", "color"],
    ["bg", "background-color"],
    ["display", "display"],
    ["align", "align-items"],
    ["justify", "justify-content"],
    ["direction", "flex-direction"],
    ["wrap", "flex-wrap"],
    ["grow", "flex-grow"],
    ["xxsmall", "font-size", "0.5rem"],
    ["xsmall", "font-size", "0.75rem"],
    ["small", "font-size", "0.875rem"],
    ["large", "font-size", "1.25rem"],
    ["xlarge", "font-size", "1.5rem"],
    ["xxlarge", "font-size", "2rem"],
    ["border", "border"],
    ["borderTop", "border-top"],
    ["borderRight", "border-right"],
    ["borderBottom", "border-bottom"],
    ["borderLeft", "border-left"],
    ["borderColor", "border-color"],
    ["borderTopColor", "border-top-color"],
    ["borderRightColor", "border-right-color"],
    ["borderBottomColor", "border-bottom-color"],
    ["borderLeftColor", "border-left-color"],
    ["borderStyle", "border-style"],
    ["borderTopStyle", "border-top-style"],
    ["borderRightStyle", "border-right-style"],
    ["borderBottomStyle", "border-bottom-style"],
    ["borderLeftStyle", "border-left-style"],
    ["borderWidth", "border-width"],
    ["borderTopWidth", "border-top-width"],
    ["borderRightWidth", "border-right-width"],
    ["borderBottomWidth", "border-bottom-width"],
    ["borderLeftWidth", "border-left-width"],
    ["borderRadius", "border-radius"],
    ["borderTopLeftRadius", "border-top-left-radius"],
    ["borderTopRightRadius", "border-top-right-radius"],
    ["borderBottomLeftRadius", "border-bottom-left-radius"],
    ["borderBottomRightRadius", "border-bottom-right-radius"],
    ["padding", "padding"],
    ["paddingTop", "padding-top"],
    ["paddingRight", "padding-right"],
    ["paddingBottom", "padding-bottom"],
    ["paddingLeft", "padding-left"],
    ["margin", "margin"],
    ["marginTop", "margin-top"],
    ["marginRight", "margin-right"],
    ["marginBottom", "margin-bottom"],
    ["marginLeft", "margin-left"],
    ["overflow", "overflow"],
    ["overflowX", "overflow-x"],
    ["overflowY", "overflow-y"],
    ["position", "position"],
    ["top", "top"],
    ["right", "right"],
    ["bottom", "bottom"],
    ["left", "left"],
    ["zIndex", "z-index"],
    ["opacity", "opacity"],
    ["cursor", "cursor"],
    ["pointer", "cursor", "pointer"],
    ["shadow", "box-shadow"]
]

export default class Style extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null
        };
    }

    componentDidMount() {
        let id = v4();
        let elem = document.createElement("style");
        elem.id = id;
        document.head.appendChild(elem);
        this.#updateStyleElement(id);
        this.setState({ id });
    }

    componentWillUnmount() {
        document.getElementById(this.state.id).remove();
    }

    componentDidUpdate() {
        this.#updateStyleElement(this.state.id);
    }

    #updateStyleElement(id) {
        const style = this.#parseProps(this.props);
        document.getElementById(id).innerHTML = style;
    }

    #parseProps(props) {
        let preTop = props.important ? "*:not(#a):not(#a):not(#a)" : "*";
        let top = props.top ? "> * " : (preTop + " ");
        if (props.proxy) top = "";
        let genStyle = `._s_${this.state.id} ${top}{ `;
        let suf = props.important ? " !important" : "";
        styleMap.forEach(item => {
            if (props[item[0]] === true) {
                // item is only preset
                if (item[2]) {
                    genStyle += `${item[1]}: ${item[2]}${suf};`;
                }
            } else if (props[item[0]]) {
                // item is preset and has value
                genStyle += `${item[1]}: ${props[item[0]]}${suf};`;
            }
        });
        if (props.css) genStyle += props.css;
        genStyle += " }";
        return genStyle;
    }

    render() {
        let _class = "_s_" + this.state.id;
        if (this.props.proxy) {
            let children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
            return children.map(c => {
                let classNames = c.props.className ? c.className + " " + _class : _class;
                let newElem = React.cloneElement(c, { className: classNames });
                console.log(newElem);
                return newElem;
            });
        } else {
            return (
                <div className={c(this.props.className, "_s_" + this.state.id)} style={this.props.style}>
                    {this.props.children}
                </div>
            );
        }
    }
}