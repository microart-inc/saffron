import React, { useEffect } from "react";
import { IoCaretDown } from "react-icons/io5";
import { istyleParser } from "../i";
import styles from './input.module.css';


export default function TextInput({ value, placeholder, prefix, suffix, onChange, defaultValue, ..._props }) {
    let _v = value === null || value === undefined;
    let _p = prefix === null || prefix === undefined;
    let _s = suffix === null || suffix === undefined;

    useEffect(() => {
        if (!_v && (_p || _s))
            console.warn('Cannot use prefix or suffix when <TextInput /> is controlled, prefix and suffix will need to be manually added.');
    }, []);
    let [inputValue, setInputValue] = React.useState(defaultValue);

    let shouldAddFix = !(!_v && (_p || _s));

    let [prefixIndex, setPrefixIndex] = React.useState(0);
    let [suffixIndex, setSuffixIndex] = React.useState(0);

    let isPrefixArray = Array.isArray(prefix);
    let isSuffixArray = Array.isArray(suffix);

    let prefixValue = isPrefixArray ? (prefix[prefixIndex] ?? "") : (prefix ?? "");
    let suffixValue = isSuffixArray ? (suffix[suffixIndex] ?? "") : (suffix ?? "");

    let props = {..._props};

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

    return (
        <div className={styles.textinputWrapper} {...props}>
            {prefix && (isPrefixArray ? (
                <TempDropDown
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
                        {suffix[prefixIndex]}
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

function TempDropDown({ items, selectedIndex, onChange, children }) {

    let [open, setOpen] = React.useState(false);

    let onWindowClick = e => {
        if (open) setOpen(false);
    }

    useEffect(() => {
        window.addEventListener('click', onWindowClick);
        return () => window.removeEventListener('click', onWindowClick);
    }, [open]);

    return (
        <div
            className={styles.textinputDropdownWrapper}
        >
            <div
                onClick={e => {
                    e.stopPropagation();
                    setOpen(!open);
                }}
            >
                {children}
            </div>
            {open && (
                <div className={styles.textinputDropdown}>
                    <div className={styles.textinputDropdownItems}>
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
                    </div>
                </div>
            )}
        </div>
    )
}