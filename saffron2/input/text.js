import React, { useEffect, useState } from "react";
import { IoCaretDown } from "react-icons/io5";
import { istyleParser } from "../i";
import styles from './input.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import { v4 } from "uuid";


export default function TextInput({
    value,
    placeholder,
    prefix,
    suffix,
    onChange,
    defaultValue,
    onPrefixChange,
    onSuffixChange,
    decoration,
    onFocus,
    onBlur,
    ..._props
}) {
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
    let [isFocused, setIsFocused] = React.useState(false);

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
    if (props.right) {
        direction = "right";
        delete props.right;
    }
    if (props.left) {
        direction = "left";
        delete props.left;
    }
    if (props.bottom) {
        direction = "bottom";
        delete props.bottom;
    }
    if (props.top) {
        direction = "top";
        delete props.top;
    }

    let inputStyle = {};
    let focusStyle = {};
    let focusStyleP = {};

    if (!_p) {
        focusStyleP.borderTopLeftRadius = 0;
        focusStyleP.borderBottomLeftRadius = 0;
    }

    if (!_s) {
        focusStyleP.borderTopRightRadius = 0;
        focusStyleP.borderBottomRightRadius = 0;
    }

    let [id, setId] = useState(props.id ?? v4());

    let label = null;
    if (props.label) {
        label = props.label;
        delete props.label;
    }

    let valid = 2;
    let allowList;
    let disallowList;
    if (props.allow) {
        if (typeof props.allow === "string") {
            let _allow = props.allow;
            _allow = _allow.replaceAll('a-z', 'abcdefghijklmnopqrstuvwxyz');
            _allow = _allow.replaceAll('A-Z', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
            _allow = _allow.replaceAll('0-9', '0123456789');
            allowList = _allow.split('');
        }
        delete props.allow;
    }
    if (props.disallow) {
        if (typeof props.disallow === "string") {
            let _disallow = props.disallow;
            _disallow = _disallow.replaceAll('&file', '\\/:*?"<>|');
            _disallow = _disallow.replaceAll('a-z', 'abcdefghijklmnopqrstuvwxyz');
            _disallow = _disallow.replaceAll('A-Z', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
            _disallow = _disallow.replaceAll('0-9', '0123456789');
            disallowList = _disallow.split('');
        }
        delete props.disallow;
    }

    if (allowList && disallowList) {
        throw new Error('Cannot use both allow and disallow lists.');
    }

    if (props.min) {
        if (inputValue.length < props.min) valid = 0;
        delete props.min;
    }

    let max;
    if (props.max) {
        max = props.max;
        delete props.max;
    }


    switch (valid) {
        case 0:
            //inputStyle['--text-input-hover-border-color'] = 'var(--s-danger)';
            //focusStyle.border = '1px solid var(--s-danger)';
            focusStyle.boxShadow = '0 0 0 2px var(--s-danger)';
            break;
        case 1:
            //inputStyle['--text-input-hover-border-color'] = 'var(--s-warning)';
            //focusStyle.border = '1px solid var(--s-warning)';
            focusStyle.boxShadow = '0 0 0 2px var(--s-warning)';
            break;
        case 2:
            //inputStyle['--text-input-hover-border-color'] = 'var(--s-success)';
            //focusStyle.border = '1px solid var(--s-accent)';
            focusStyle.boxShadow = '0 0 0 2px var(--s-accent)';
            break;
    }

    return (
        <div className={styles.inputAndLabelWrapper} {...props}>
            {label && <label htmlFor={id}>{label}</label>}
            <div className={styles.textinputWrapper}>
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
                            if (onPrefixChange) {
                                onPrefixChange?.(e.target.value);
                            } else {
                                onChange?.(enew);
                            }
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
                <div
                    className={styles.inputWrapper}
                    style={isFocused ? {
                        ...focusStyleP,
                        ...focusStyle
                    } : focusStyleP}
                >
                    <input
                        className={styles.textinput}
                        value={value ?? inputValue}
                        placeholder={placeholder ?? "<TextInput />"}
                        style={inputStyle}
                        id={id}
                        maxLength={max?.toString()}
                        onFocus={() => {
                            setIsFocused(true);
                            onFocus?.();
                        }}
                        onBlur={() => {
                            setIsFocused(false);
                            onBlur?.();
                        }}
                        onChange={e => {
                            if (max) {
                                if (e.target.value.length > max) return;
                            }
                            let shouldInput = true;
                            if (allowList || disallowList) {
                                let _allow = allowList;
                                let _disallow = disallowList;
                                let _value = e.target.value;
                                for (let i = 0; i < _value.length; i++) {
                                    if (_allow) {
                                        if (!_allow.includes(_value[i])) {
                                            shouldInput = false;
                                            break;
                                        }
                                    } else if (_disallow) {
                                        if (_disallow.includes(_value[i])) {
                                            shouldInput = false;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (shouldInput) {
                                setInputValue(e.target.value);
                                let enew = {
                                    ...e,
                                    target: {
                                        ...e.target,
                                        value: shouldAddFix ? (prefixValue + e.target.value + suffixValue) : e.target.value
                                    }
                                }
                                onChange?.(enew);
                            }
                        }}
                    />
                    {decoration && decoration}
                </div>
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
                            if (onSuffixChange) {
                                onSuffixChange?.(e.target.value);
                            } else {
                                onChange?.(enew);
                            }
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
            </div>
        </div>
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