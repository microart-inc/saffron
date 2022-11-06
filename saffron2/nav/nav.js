import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import Button from "../button/button";
import Icon from "../icon/icon";
import TextInput from "../input/text";
import styles from './nav.module.css';

export default function Nav({ title, subtitle }) {

    title = title ?? "Saffron";
    subtitle = subtitle ?? "Nav";

    let sampleSuggestions = {
        categories: [
            {
                name: "Products",
                link: "/products",
                id: 0,
                items: [
                    {
                        id: 0,
                        name: "Quran",
                        subtitle: "The Quran — Read books, duas, and religous books.",
                        image: "https://firebasestorage.googleapis.com/v0/b/microart-api.appspot.com/o/apps%2Ficons%2F278bf88b-97a8-503e-a3e4-6b634a13a68e.png?alt=media",
                        link: "/products/quran",
                    },
                    {
                        id: 0,
                        name: "Fireaura",
                        subtitle: "Generative and assertive transformer AI that can create human-like text with accuracy and originality.",
                        image: "https://firebasestorage.googleapis.com/v0/b/microart-api.appspot.com/o/apps%2Ficons%2Fee55e200-88b2-540e-ab27-aa1fa866e5cd.png?alt=media",
                        link: "/products/fireaura",
                    }
                ]
            },
            {
                name: "Cloud",
                link: "/cloud",
                id: 1,
                items: [
                    {
                        id: 0,
                        name: "Sterling",
                        subtitle: "Sterling is a self-hosted front-end for your server storage.",
                        image: "https://cloud.microart.cf/cdn/images/services/sterling.png",
                        link: "/cloud/sterling",
                    }
                ]
            },
            {
                name: "Documentation",
                link: "/docs",
                id: 2,
                items: [
                    {
                        id: 0,
                        name: "Sterling — Getting Started",
                        subtitle: "...you can create another instance of the sterling with a different name...",
                    }
                ]
            },
            {
                name: "Blogs",
                link: "/blogs",
                id: 3,
                items: [
                    {
                        id: 0,
                        name: "Using Microart Cloud to deploy your custom Sterling front-end.",
                        subtitle: "In this article, we will discuss how you can use Microart Cloud to deploy your custom Sterling front-end."
                    }
                ]
            },
            {
                name: "Release Files",
                link: "/updates",
                id: 4,
                items: [
                    {
                        id: 0,
                        name: "sterling-v4.30-alpha.zip",
                        subtitle: "Sterling - Server storage frontend",
                    },
                    {
                        id: 1,
                        name: "sterling-v4.29-alpha.zip",
                        subtitle: "Sterling - Server storage frontend",
                    },
                    {
                        id: 2,
                        name: "sterling-v4.28-alpha.zip",
                        subtitle: "Sterling - Server storage frontend",
                    },
                    {
                        id: 3,
                        name: "serenity-addon.zip",
                        subtitle: "Serenity - Essential sterling addons"
                    }
                ]
            }
        ]
    };

    let [isDarkTheme, setDarkTheme] = React.useState(false);
    let [showSuggestions, setShowSuggestions] = React.useState(false);
    let [searchFocus, setSearchFocus] = React.useState(false);
    let [searchQuery, setSearchQuery] = React.useState("");
    let [suggestions, setSuggestions] = React.useState(sampleSuggestions);

    if (searchQuery === "ste" && suggestions === null) setSuggestions(sampleSuggestions);
    else if (searchQuery !== "ste" && suggestions !== null) setSuggestions(null);

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
                            setSearchQuery(e.target.value)
                            if (e.target.value && searchFocus) setShowSuggestions(true);
                            else setShowSuggestions(false);
                        }}
                    />
                    <AnimatePresence>
                        {showSuggestions && suggestions && (
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