import React from "react";
import Button from "../button/button";
import TextInput from "../input/text";
import styles from './nav.module.css';

export default function Nav({ title, subtitle }) {

    title = title ?? "Saffron";
    subtitle = subtitle ?? "Nav";

    return (
        <>
            <nav className={styles.nav}>
                <div className={styles.left}>
                    {title && <span className={styles.title}>{title}</span>}
                    {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
                </div>
                <div className={styles.middle}>
                    <TextInput
                        placeholder="Search"
                        width="100%"
                        maxWidth="400px"
                    />
                    <div className={styles.suggestions}>
                        <div>
                            <span>In Products</span>
                            <div>
                                <span>Quran</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <Button link medium bg="#606060">Example</Button>
                    <Button link medium bg="#606060">Navigation</Button>
                    <Button link medium bg="#606060">Buttons</Button>
                </div>
            </nav>
            <div className={styles.ghost} />
        </>
    )
}