import React from "react";
import styles from './card.module.css';
import c from '../../CustomClass';
import { iextractChild, istyleParser, icap } from '../i';
import { CardImage, CardFooter } from "../../v2";

export default function Card(_props) {
    let props = { ..._props };
    props.children = props.children.length !== undefined ? [...props.children] : props.children;
    let classes = [styles.card, props.className];

    if (props.min) {
        classes.push(styles.min);
        props.min = undefined;
    }

    props = istyleParser(props);

    let image = iextractChild(props, CardImage);
    let footer = iextractChild(props, CardFooter);

    let decoration = {};

    if (props.decorationColor) {
        let dColor = props.decorationColor ?? 'black';
        let dSize = props.decorationSize ?? 3;
        let dSide = props.decorationSide ?? 'left';
        decoration['border' + icap(dSide)] =  dSize + 'px solid ' + dColor;
        props.decorationColor = undefined;
        props.decorationSide = undefined;
        props.decorationSize = undefined;
    }

    return (
        <div
            {...props}
            className={c(...classes)}
            style={{
                ...props.style,
                ...decoration
            }}
        >
            {image && image.props.end !== true && getImage(image)}

            <div className={c(styles.content, props.contentClassName)}>
                {props.children}
            </div>

            {image && image.props.end === true && getImage(image)}

            {footer && getFooter(footer)}
        </div>
    )
}

function getFooter(footer) {
    return (
        <div className={c(styles.footer, footer.props.className)}
            style={{
                ...footer.props.style,
                ...(footer.props.center ? { alignItems: 'center' } : {}),
                ...(footer.props.right ? { alignItems: 'flex-end' } : {}),
                ...(footer.props.left ? { alignItems: 'flex-start' } : {}),
            }}
        >
            {footer.props.children}
        </div>
    );
}

function getImage(image) {
    return (
        <div
            className={c(styles.image, image.props.className)}
        >
            {image.props.envelop ? (
                <div
                    style={{
                        ...(image.props.shrink === true ? { backgroundSize: 'contain' } : { backgroundSize: 'cover' }),
                        ...(image.props.bg ? { background: `url(${image.props.src}), ${image.props.bg}` } : {
                            backgroundImage: `url(${image.props.src})`
                        })
                    }}
                    className={styles.imageEnvelop}
                />
            ) : (
                <img src={image.props.src} alt={image.props.alt}
                    style={{
                        ...image.props.style,
                        ...(image.props.shrink === true ? { objectFit: 'contain' } : {}),
                        ...(image.props.bg ? { backgroundColor: image.props.bg } : {})
                    }}
                />
            )}
            {image.props.caption && (
                <div className={styles.caption}>
                    {new String(image.props.caption)}
                </div>
            )}
        </div>
    );
}