import React, { useEffect } from "react";
import { IoCaretDown } from "react-icons/io5";
import { istyleParser } from "../i";
import styles from './input.module.css';
import { AnimatePresence, motion } from 'framer-motion';


export default function TextInput({ value, placeholder, prefix, suffix, onChange, defaultValue, ..._props }) {
    let _v = value === null || value === undefined;
    let _p = prefix === null || prefix === undefined;
    let _s = suffix === null || suffix === undefined;

    useEffect(() => {
        if (!_v && (_p || _s))
            console.warn('<TextInput /> is currently in controlled mode, prefixes and suffixes will need to be manually added.');
    }, []);
    let [inputValue, setInputValue] = React.useState(defaultValue ?? "");

    let shouldAddFix = !(!_v && (_p || _s));

    let [prefixIndex, setPrefixIndex] = React.useState(0);
    let [suffixIndex, setSuffixIndex] = React.useState(0);

    let isPrefixArray = Array.isArray(prefix);
    let isSuffixArray = Array.isArray(suffix);

    let prefixValue = isPrefixArray ? (prefix[prefixIndex] ?? "") : (prefix ?? "");
    let suffixValue = isSuffixArray ? (suffix[suffixIndex] ?? "") : (suffix ?? "");

    let props = { ..._props };

    props = istyleParser(props);

    useEffect(() => {
        let _prefix = _v ? prefixValue : "";
        let _suffix = _v ? suffixValue : "";
        onChange?.({
            target: {
                value: _prefix + inputValue + _suffix
            }
        });
    }, []);


    let direction = "bottom";
    if (props.right) direction = "right";
    if (props.left) direction = "left";
    if (props.bottom) direction = "bottom";
    if (props.top) direction = "top";

    let inputStyle = {};

    if(!_p) {
        inputStyle.borderTopLeftRadius = 0;
        inputStyle.borderBottomLeftRadius = 0;
    }

    if(!_s) {
        inputStyle.borderTopRightRadius = 0;
        inputStyle.borderBottomRightRadius = 0;
    }

    return (
        <div className={styles.textinputWrapper} {...props}>
            {prefix && (isPrefixArray ? (
                <TempDropDown
                    direction={direction}
                    items={prefix}
                    selectedIndex={prefixIndex}
                    onChange={e => {
                        setPrefixIndex(e.target.value);
                        let enew = {
                            ...e,
                            target: {
                                ...e.target,
                                value: shouldAddFix ? (prefix[e.target.value] + inputValue + suffixValue) : inputValue
                            }
                        }
                        onChange?.(enew);
                    }}
                >
                    <div
                        className={styles.textinputPrefix}
                        style={{
                            ...(prefix.length > 1 && {
                                cursor: 'pointer'
                            })
                        }}
                    >
                        {prefix[prefixIndex]}
                        {prefix.length > 1 && (
                            <IoCaretDown />
                        )}
                    </div>
                </TempDropDown>
            ) : (
                <div className={styles.textinputPrefix}>{prefix}</div>
            ))}
            <input
                className={styles.textinput}
                value={value ?? inputValue}
                placeholder={placeholder ?? "<TextInput />"}
                style={inputStyle}
                onChange={e => {
                    setInputValue(e.target.value);
                    let enew = {
                        ...e,
                        target: {
                            ...e.target,
                            value: shouldAddFix ? (prefixValue + e.target.value + suffixValue) : e.target.value
                        }
                    }
                    onChange?.(enew);
                }}
            />
            {suffix && (isSuffixArray ? (
                <TempDropDown
                    direction={direction}
                    items={suffix}
                    selectedIndex={suffixIndex}
                    onChange={e => {
                        setSuffixIndex(e.target.value);
                        let enew = {
                            ...e,
                            target: {
                                ...e.target,
                                value: shouldAddFix ? (prefixValue + inputValue + suffix[e.target.value]) : inputValue
                            }
                        }
                        onChange?.(enew);
                    }}
                >
                    <div
                        className={styles.textinputSuffix}
                        style={{
                            ...(suffix.length > 1 && {
                                cursor: 'pointer'
                            })
                        }}
                    >
                        {suffix[suffixIndex]}
                        {suffix.length > 1 && (
                            <IoCaretDown />
                        )}
                    </div>
                </TempDropDown>
            ) : (
                <div className={styles.textinputSuffix}>{suffix}</div>
            ))}
        </div >
    );
}

function TempDropDown({ items, selectedIndex, onChange, children, direction }) {

    let [open, setOpen] = React.useState(false);

    let onWindowClick = e => {
        if (open) setOpen(false);
    }

    useEffect(() => {
        window.addEventListener('click', onWindowClick);
        return () => window.removeEventListener('click', onWindowClick);
    }, [open]);

    let parentStyle = {};
    let dropdownStyleOrg = {};
    let dropdownStyle = {};

    switch (direction) {
        case "top":
            parentStyle = {
                flexDirection: 'column-reverse',
                top: -5
            };
            dropdownStyle = { y: "calc(-100% - 5px)", height: 'auto' };
            dropdownStyleOrg = { y: 20, height: 0 };
            break;
        case "bottom":
            parentStyle = {
                flexDirection: 'column',
                top: 5
            };
            dropdownStyle = { y: 5, height: 'auto' };
            dropdownStyleOrg = { y: -20, height: 0 };
            break;
        case "left":
            parentStyle = {
                flexDirection: 'row-reverse',
                left: -5
            };
            dropdownStyle = { x: -5 };
            dropdownStyleOrg = { x: 50 };
            break;
        case "right":
            parentStyle = {
                flexDirection: 'row',
                left: 5
            };
            dropdownStyle = { x: 5, width: 'auto' };
            dropdownStyleOrg = { x: -50, width: 0 };
            break;
    }

    return (
        <div
            className={styles.textinputDropdownWrapper}
            style={parentStyle}
        >
            <div
                onClick={e => {
                    e.stopPropagation();
                    setOpen(!open);
                }}
            >
                {children}
            </div>
            <AnimatePresence>
                {open && (
                    <div className={styles.textinputDropdown}>
                        <motion.div
                            className={styles.textinputDropdownItems}
                            initial={{ opacity: 0, filter: 'blur(15px)', scale: 0.9, ...dropdownStyleOrg }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, ...dropdownStyle }}
                            exit={{ opacity: 0, filter: 'blur(15px)', scale: 0.9, ...dropdownStyleOrg }}
                            transition={{
                                duration: 0.4,
                                ease: 'easeOut'
                            }}
                        >
                            {items.map((p, i) => (
                                <div
                                    key={i}
                                    className={styles.textinputDropdownItem}
                                    onClick={e => {
                                        e.stopPropagation();
                                        let enew = {
                                            ...e,
                                            target: {
                                                ...e.target,
                                                value: i
                                            }
                                        };
                                        onChange?.(enew);
                                        setOpen(false);
                                    }}
                                >
                                    {p}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}