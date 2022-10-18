import React, { useRef, useState } from "react";
import { IoCaretDown, IoCaretUp } from "react-icons/io5";
import { istyleParser } from "../i";
import TextInput from "./text";
import styles from './byte.module.css';

export default function ByteInput(_props) {
    let props = { ..._props };

    let sizes = [
        ["bytes", 1],
        ["KB", 1024],
        ["MB", 1024 * 1024],
        ["GB", 1024 * 1024 * 1024],
        ["TB", 1024 * 1024 * 1024 * 1024],
    ]
    let [value, setValue] = useState(props.value ?? props.defaultValue ?? "0");
    let [suffix, setSuffix] = useState(0);


    return (
        <TextInput
            placeholder={'<ByteHolder />'}
            suffix={sizes.map(x => x[0])}
            onSuffixChange={v => {
                setSuffix(v);
                props.onChange?.({
                    target: {
                        value: value * sizes[v][1]
                    }
                });
            }}
            value={formatNumber(value) || "0"}
            onChange={(e) => {
                let val = e.target.value;
                val = val.replace(/^[0]*|[^0-9.]/gm, "");
                setValue(val);
                props.onChange?.({
                    ...e,
                    target: {
                        ...e.target,
                        value: parseFloat(val) * sizes[suffix][1]
                    }
                });
            }}
            decoration={
                <div className={styles.buttons}>
                    <IoCaretUp 
                        onClick={() => {
                            let val = parseFloat(value ?? 0);
                            val = isNaN(val) ? 0 : val;
                            val += 1;
                            setValue(val.toString());
                            props.onChange?.({
                                target: {
                                    value: val * sizes[suffix][1]
                                }
                            });
                        }}
                    />
                    <IoCaretDown 
                        onClick={() => {
                            let val = parseFloat(value ?? 0);
                            val = isNaN(val) ? 0 : val;
                            val -= 1;
                            setValue(val.toString());
                            props.onChange?.({
                                target: {
                                    value: val * sizes[suffix][1]
                                }
                            });
                        }}
                    />
                </div>
            }
            {...props}
        />
    )
}

function formatNumber(_str) {
    // add commas every 3 digits
    let str = "";
    let decimal = "";
    if (_str.includes(".")) {
        let sp = _str.split(".");
        str = sp[0];
        decimal = "." + sp[1];
    } else {
        str = _str;
    }
    let num = "";
    let count = 0;
    for (let i = str.length - 1; i >= 0; i--) {
        num = str[i] + num;
        count++;
        if (count % 3 == 0 && i != 0) num = "," + num;
    }
    return num + decimal;
}

function format(str, oldStr) {
    let periods = 0;
    for (let i = 0; i < str.length; i++) if (str[i] === ".") periods++;
    if (periods > 1) return oldStr;
    let list = "0123456789.";
    let num = "";
    for (let i = 0; i < str.length; i++) if (list.includes(str[i])) num += str[i];
    return num;
}