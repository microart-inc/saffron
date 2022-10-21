import React from "react";
import Button from "../button/button";
import Icon from "../icon/icon";
import TextInput from "../input/text";
import styles from './nav.module.css';

export default function Nav({ title, subtitle }) {

    title = title ?? "Saffron";
    subtitle = subtitle ?? "Nav";

    let suggestions = {
        categories: [
            {
                name: "Products",
                link: "/products",
                id: 0,
                items: [
                    {
                        name: "Quran",
                        subtitle: "The Quran — Read books, duas, and religous books.",
                        image: "https://firebasestorage.googleapis.com/v0/b/microart-api.appspot.com/o/apps%2Ficons%2F278bf88b-97a8-503e-a3e4-6b634a13a68e.png?alt=media",
                        link: "/products/quran",
                    },
                    {
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
                        name: "sterling-v4.30-alpha.zip",
                        subtitle: "Sterling - Server storage frontend",
                    },
                    {
                        name: "sterling-v4.29-alpha.zip",
                        subtitle: "Sterling - Server storage frontend",
                    },
                    {
                        name: "sterling-v4.28-alpha.zip",
                        subtitle: "Sterling - Server storage frontend",
                    },
                    {
                        name: "serenity-addon.zip",
                        subtitle: "Serenity - Essential sterling addons"
                    }
                ]
            }
        ]
    };

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
                    {false && (
                        <div className={styles.suggestionsWrapper}>
                            <div className={styles.suggestions}>
                                {suggestions.categories.map(cat => (
                                    <div className={styles.category}>
                                        <span className={styles.categoryTitle}>
                                            In <span className={styles.categoryTitleLink}>
                                                {cat.name} <Icon>ArrowForward</Icon>
                                            </span>
                                        </span>
                                        <div className={styles.categoryContent}>
                                            {cat.items.map(item => (
                                                <div className={styles.categoryContentItem}>
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
                        </div>
                    )}
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