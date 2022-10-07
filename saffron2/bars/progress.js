import React from "react";
import c from '../../CustomClass';
import styles from './progress.module.css';
import { motion } from 'framer-motion';

export default function ProgressBar(props) {

    let wrapperStyle = {};
    let barStyle = {};

    if (props.color) barStyle.backgroundColor = props.color;
    if (props.width) wrapperStyle.width = props.width;
    if (props.height) wrapperStyle.height = props.height;
    if (props.bg) wrapperStyle.backgroundColor = props.bg;
    if (props.progress) barStyle.width = props.progress + '%';

    return (
        <div className={c(styles.wrapper, props.className)} style={wrapperStyle}>
            {props.animate !== false ? (
                <motion.div
                    className={c(styles.bar, props.barClassName)}
                    style={barStyle}
                    initial={{ width: 0 }}
                    animate={{ width: (props.progress ?? 50) + '%' }}
                    transition={{
                        duration: 0.7,
                        ease: [.3, .84, .29, .91]
                    }}
                />
            ) : (
                <div className={c(styles.bar, props.barClassName)} style={barStyle} />
            )}
        </div>
    );
}