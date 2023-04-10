import styles from "./Input.module.css";
import { useState } from "react";

const Input = ({
    value,
    onChange,
    name,
    type,
    placeholder,
    setStyles,
    errorMsg,
    required,
    pattern,
}) => {
    const [focused, setFocused] = useState(false);
    const isRequired = required;
    const handleOnBlur = (e) => {
        setFocused(true);
    };

    return (
        <>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={isRequired}
                pattern={pattern}
                onBlur={handleOnBlur}
                focused={focused.toString()}
                onFocus={() => name === "passConfirm" && setFocused(true)}
            />
            <span className={styles[`${setStyles}`]}>{errorMsg}</span>
        </>
    );
};

export default Input;
