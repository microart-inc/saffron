import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import Button from "../button/button";
import Icon from "../icon/icon";
import TextInput from "../input/text";
import styles from './nav.module.css';

export default function Nav({ title, subtitle, suggestions, onChange }) {

    title = title ?? "Saffron";
    subtitle = subtitle ?? "Nav";

    let [isDarkTheme, setDarkTheme] = React.useState(false);
    let [showSuggestions, setShowSuggestions] = React.useState(false);
    let [searchFocus, setSearchFocus] = React.useState(false);
    let [searchQuery, setSearchQuery] = React.useState("");

    let buttonLight = "#606060";
    let buttonDark = "#b0b0c0";

    let buttonColor = isDarkTheme ? buttonDark : buttonLight;

    let windowClick = (e) => {
        setSearchFocus(false);
        setShowSuggestions(false);
    }


    useEffect(() => {
        if (typeof window !== "undefined") {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setDarkTheme(true);
            } else if (document.body.parentElement.getAttribute("data-theme") === "dark") {
                setDarkTheme(true);
            }
            window.addEventListener("click", windowClick);
            return () => {
                window.removeEventListener("click", windowClick);
            }
        }
    }, []);

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
                        onClick={(e) => {
                            setSearchFocus(true);
                            if (searchQuery) setShowSuggestions(true);
                            e.stopPropagation();
                        }}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            onChange?.(e.target.value);
                            if (e.target.value && searchFocus) setShowSuggestions(true);
                            else setShowSuggestions(false);
                        }}
                    />
                    <AnimatePresence>
                        {showSuggestions && suggestions && suggestions.categories.length > 0 && (
                            <motion.div
                                className={styles.suggestionsWrapper}
                                initial={{ opacity: 0, filter: 'blur(15px)', scale: 0.9, y: -25 }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                                exit={{ opacity: 0, filter: 'blur(15px)', scale: 0.9, y: -25 }}
                                transition={{
                                    duration: 0.4,
                                    ease: 'easeOut'
                                }}
                                onClick={e => e.stopPropagation()}
                                layout
                            >
                                <div className={styles.suggestions}>
                                    {suggestions.categories.map(cat => (
                                        <div className={styles.category} key={cat.id}>
                                            <span className={styles.categoryTitle}>
                                                In <span className={styles.categoryTitleLink}>
                                                    {cat.name} <Icon>ArrowForward</Icon>
                                                </span>
                                            </span>
                                            <div className={styles.categoryContent}>
                                                {cat.items.map(item => (
                                                    <div className={styles.categoryContentItem} key={item.id}>
                                                        {item.image && <img src={item.image} className={styles.itemImage} />}
                                                        <div className={styles.itemInfo}>
                                                            <span className={styles.itemTitle}>{item.name}</span>
                                                            <span className={styles.itemSubtitle}>{item.subtitle}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <div className={styles.right}>
                    <Button link medium bg={buttonColor}>Example</Button>
                    <Button link medium bg={buttonColor}>Navigation</Button>
                    <Button link medium bg={buttonColor}>Buttons</Button>
                </div>
            </nav>
            <div className={styles.ghost} />
        </>
    )
}