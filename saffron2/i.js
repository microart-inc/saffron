// css inline properties to support (popular and common only)
const properties = [
    'color', 'margin', 'padding', 'width', 'height',
    'border', 'gap', 'maxWidth', 'minWidth', 'minHeight', 'maxHeight',
    'cursor', 'display', 'flex', 'flexDirection', 'flexWrap', 'justifyContent',
    'borderTop', 'borderBottom', 'borderLeft', 'borderRight',
    'marginTop', 'marginBottom', 'marginLeft', 'marginRight',
    'borderColor', 'letterSpacing', 'paddingTop', 'paddingBottom', 'paddingLeft',
    'paddingRight', 'fontWeight'
];
// [key, style-key, default if true, should allow custom value]
const specialProperties = [
    ['bold', 'fontWeight', 'bold'],
    ['italic', 'fontStyle', 'italic'],
];

const customProperties = [
    ['xxsmall', 'fontSize', '0.55em'],
    ['xsmall', 'fontSize', '0.7em'],
    ['small', 'fontSize', '0.8em'],
    ['medium', 'fontSize', '0.9em'],
    ['normal', 'fontSize', '1em'],
    ['large', 'fontSize', '1.2em'],
    ['xlarge', 'fontSize', '1.4em'],
    ['xxlarge', 'fontSize', '1.6em'],
    ['mono', 'fontFamily', 'monospace'],
    ['underline', 'textDecoration', 'underline'],
    ['strike', 'textDecoration', 'line-through'],
    ['danger', 'color', 'var(--s-danger)'],
    ['success', 'color', 'var(--s-success)'],
    ['warning', 'color', 'var(--s-warning)'],
    ['info', 'color', 'var(--s-info)'],
    ['uppercase', 'textTransform', 'uppercase'],
    ['lowercase', 'textTransform', 'lowercase'],
    ['capitalize', 'textTransform', 'capitalize'],
    ['center', 'textAlign', 'center'],
];

const aliasProperties = [
    ['bg', 'background'],
];

export function istyleParser(props, isText = false) {

    if (props.bold === true) {
        props.style = { ...props.style, fontWeight: 'bold' };
        delete props.bold;
    }

    if (props.bg && !props.rawBg && isText) {
        props.style = {
            ...props.style,
            borderRadius: 3,
            padding: "1px 4px"
        };
    }

    if (props.rawBg) {
        delete props.rawBg;
    }

    properties.forEach((prop) => {
        if (props[prop]) {
            props.style = { ...props.style, [prop]: props[prop] };
            delete props[prop];
        }
    });

    specialProperties.forEach((prop) => {
        if (props[prop[0]] === true) {
            props.style = { ...props.style, [prop[1]]: prop[2] };
            delete props[prop[0]];
        } else if (props[prop[0]] && prop[3] !== false) {
            props.style = { ...props.style, [prop[1]]: props[prop[0]] };
            delete props[prop[0]];
        } else {
            delete props[prop[0]];
        }
    });

    customProperties.forEach((prop) => {
        if (props[prop[0]] === true) {
            props.style = { ...props.style, [prop[1]]: prop[2] };
            delete props[prop[0]];
        }
    });

    aliasProperties.forEach((prop) => {
        if (props[prop[0]]) {
            props.style = { ...props.style, [prop[1]]: props[prop[0]] };
            delete props[prop[0]];
        }
    });

    return props;
}

export function iextractChild(props, childType) {
    if (Array.isArray(props.children)) {
        let index = props.children.findIndex(child => child.type.prototype === childType.prototype);
        if (index > -1) {
            let match = props.children[index];
            props.children.splice(index, 1);
            if (props.children.findIndex(child => child.type.prototype === childType.prototype) > -1) {
                throw new (() => {
                    this.message = "You can only have one " + childType.name + " child";
                    this.name = "ChildError";
                })
            }
            return match;
        }
    } else if (props.children?.type.prototype === childType.prototype) {
        let match = props.children;
        props.children = null;
        return match;
    }
    return null;
}

export function getDebugFlags(namespace) {

}

export function icap(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}