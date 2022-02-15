import React from 'react';
import styles from './Nav.module.css';
import {
    Button,
    TextInput
} from '../../Saffron'
import Link from 'next/link';
import { withRouter } from 'next/router';
import {
    IoReorderTwoOutline,
    IoSearchOutline
} from 'react-icons/io5';
import AppsProvider from '../../AppsProvider';
import Flex from '../Flex/Flex';

class Nav extends React.Component {
    /*
    constructor(props) {
        super(props);
        //#region Microart Dev Object
        global.__microart_dev = {};
        global.__microart_dev.__proto__.functions = {
            apps: {
                openAddPage: () => {
                    if (!global.__microart_permissions) global.__microart_permissions = {};
                    global.__microart_permissions.add_apps = true;
                    props.history.push("/dev/add/app");
                }
            }
        }
        //#endregion
    }
    */

    constructor(props) {
        super(props);
        this.state = {
            search: "",
            apps: null,
            suggestions: null,
            hasFocus: false
        };
    }

    componentDidMount = async () => {
        await new Promise(resolve => setTimeout(resolve, 700));
        let { apps } = await AppsProvider.getApps();
        if (apps) {
            this.setState({
                apps: apps
            });
        }
    }

    render() {
        let showSuggestions = false;
        if (this.state.suggestions !== null && this.state.suggestions.length > 0) showSuggestions = true;
        if (!this.state.hasFocus) showSuggestions = false;
        return (
            <div className={styles.centerWrapper} onBlur={(event) => {
                setTimeout(() => {
                    this.setState({
                        hasFocus: false
                    });
                }, 100);
            }}>
                <div className={styles.container}>
                    <Link href="/">
                        <div className={styles.logocontainer}>
                            <div
                                className={styles.logo}
                                style={{
                                    background: "url('/cdn/images/logos/logo.png')"
                                }}
                                href="/"
                            />
                            <div className={styles.desktopmenu}>
                                <Button text="Microart" style={{
                                    fontFamily: "Montserrat",
                                    textTransform: "uppercase",
                                    fontWeight: "bold",
                                    fontSize: "1.1em",
                                    color: "#727AD6"
                                }} outline />
                            </div>
                        </div>
                    </Link>
                    <TextInput
                        onFocus={() => {
                            this.setState({
                                hasFocus: true
                            });
                        }}
                        className={styles.textinput}
                        placeholder={
                            <div className={styles.searchplaceholder}>
                                <IoSearchOutline />
                                <span>Search...</span>
                            </div>
                        }
                        value={this.state.search}
                        onChange={(e) => {
                            let value = e.target.value;
                            let appsByName = [];
                            if (value !== "") {
                                appsByName = this.state.apps.filter(x => x.name.toLowerCase().includes(value.toLowerCase()));
                            }
                            this.setState({
                                suggestions: appsByName,
                                search: value
                            });
                        }}
                    />
                    <div className={styles.buttons}>
                        {/*
                    <Button text="Login" primary outline />
                    <Button text="Sign up" outline />
                    */}
                        <Button text="Quran" href="/showroom/quran" />
                        <Button text="Sailscript" href="/showroom/sailscript" />
                        <Button text="AutoIconifier" href="/showroom/autoiconifier" />
                        <Button text="Apps" href="/apps" />
                        <Button text="Contact" href="mailto:contact@microart.cf" />
                    </div>
                    <div className={styles.mobilemenu}>
                        <IoReorderTwoOutline />
                    </div>
                </div>

                {showSuggestions ? (
                    <div
                        className={styles.absoluteCenter}
                    >
                        <div className={styles.hidden}>
                            <div className={styles.logocontainer}>
                                <div
                                    className={styles.logo}
                                    style={{
                                        background: "url('/cdn/images/logos/logo.png')"
                                    }}
                                    href="/"
                                />
                                <div className={styles.desktopmenu}>
                                    <Button text="Microart" style={{
                                        fontFamily: "Montserrat",
                                        textTransform: "uppercase",
                                        fontWeight: "bold",
                                        fontSize: "1.1em",
                                        color: "#727AD6"
                                    }} outline />
                                </div>
                            </div>
                        </div>
                        <Flex
                            column
                            className={styles.suggestionsWrapper}
                        >
                            <span className={styles.tinytext}>Search Results</span>
                            <div className={styles.thinDivider} />
                            <div>
                                {this.state.suggestions?.map((app) => {
                                    return (
                                        <div
                                            key={app.id}
                                            className={styles.suggestion}
                                            onClick={() => {
                                                this.props.router.push(`/apps/${app.id}`);
                                            }}
                                        >
                                            <img src={app.iconUrl} className={styles.suggestionimage} />
                                            <div className={styles.suggestioninfo}>
                                                <h3>{app.name}</h3>
                                                <span>{app.category.name}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Flex>
                        <div className={styles.hidden}>
                            <div className={styles.buttons}>
                                <Button text="Quran" href="/showroom/quran" />
                                <Button text="Apps" href="/apps" />
                                <Button text="About" />
                                <Button text="Contact" />
                            </div>
                        </div>
                    </div>
                ) : null}

            </div>
        );
    }
}

export default withRouter(Nav);