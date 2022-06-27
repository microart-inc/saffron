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
    IoSearchOutline,
    IoCloseOutline
} from 'react-icons/io5';
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

    render() {
        let showSuggestions = false;
        let suggestions = this.props.suggestions ?? this.state.suggestions;
        if (suggestions !== null && suggestions.length > 0 || this.props.suggestionsRaw) showSuggestions = true;
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
                                style={this.props.iconUrl ? ({
                                    background: `url('${this.props.iconUrl}')`
                                }) : ({
                                    border: '2px dashed gray',
                                    borderRadius: 100,
                                    background: 'rgba(0,0,0,0.1)'
                                })}
                                href="/"
                            />
                            <div className={styles.desktopmenu}>
                                <Button text={this.props.title ?? "Saffron Nav"} style={{
                                    fontFamily: "Montserrat",
                                    textTransform: "uppercase",
                                    fontWeight: "bold",
                                    fontSize: "1.1em",
                                    color: "black",
                                    ...this.props.titleStyle
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
                        value={this.props.search ?? this.state.search}
                        onChange={this.props.searchOnChange ?? ((e) => {
                            let value = e.target.value;
                            let appsByName = [];
                            if (value !== "") {
                                appsByName = this.state.apps.filter(x => x.name.toLowerCase().includes(value.toLowerCase()));
                            }
                            this.setState({
                                suggestions: appsByName,
                                search: value
                            });
                        })}
                    />
                    <div className={styles.buttons}>
                        {/*
                    <Button text="Login" primary outline />
                    <Button text="Sign up" outline />
                    */}
                        {this.props.buttons ?? (
                            <>
                                <Button text="Sample Button" />
                                <Button text="Sample Button" />
                                <Button text="Sample Button" />
                            </>
                        )}
                    </div>
                    <div
                        className={styles.mobilemenu}
                    >
                        {this.state.mobileMenu ? (
                            <IoCloseOutline onClick={() => {
                                this.setState({
                                    mobileMenu: false
                                });
                            }} />
                        ) : (
                            <IoReorderTwoOutline onClick={() => {
                                this.setState({
                                    mobileMenu: true
                                });
                            }} />
                        )}
                    </div>
                </div>

                {this.state.mobileMenu ? (
                    <div className={styles.mobileWrapper}>
                        {this.props.buttons}
                    </div>
                ) : null}

                {showSuggestions ? (
                    <div
                        className={styles.absoluteCenter}
                    >
                        <div className={styles.hidden}>
                            <div className={styles.logocontainer}>
                                <div
                                    className={styles.logo}
                                    style={{
                                        background: `url(${this.props.iconUrl ?? '/cdn/images/logos/logo.png'})`
                                    }}
                                    href="/"
                                />
                                <div className={styles.desktopmenu}>
                                    <Button text={this.props.title ?? "Microart"} style={{
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
                                {this.props.suggestionsRaw ?? (
                                    suggestions?.map((app) => {
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
                                    })
                                )}
                            </div>
                        </Flex>
                        <div className={styles.hidden}>
                            <div className={styles.buttons}>
                                {this.props.buttons ?? (
                                    <>
                                        <Button text="Sample Button" />
                                        <Button text="Sample Button" />
                                        <Button text="Sample Button" />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ) : null}

            </div>
        );
    }
}

export default withRouter(Nav);