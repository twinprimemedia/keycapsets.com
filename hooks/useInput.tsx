import React, { useState, useRef, useEffect, HTMLProps, LegacyRef, ChangeEvent } from 'react';

interface InputProps extends HTMLProps<HTMLInputElement> {
    reference?: LegacyRef<HTMLInputElement>;
    autoFocus?: boolean;
}

function Input(props: InputProps & HTMLProps<HTMLInputElement>): JSX.Element {
    const { type = 'text', label, id, onChange, defaultValue, placeholder, reference, className } = props;
    return (
        <div className={`input-wrapper ${type} ${className}`}>
            {label && (
                <label htmlFor={id} className="label">
                    {label}
                </label>
            )}
            <input
                onChange={onChange}
                defaultValue={defaultValue}
                name={id}
                id={id}
                type={type}
                placeholder={placeholder}
                ref={reference}
            />
        </div>
    );
}

function useInput(props: InputProps) {
    const { type = 'text', label, placeholder, id, defaultValue = '', autoFocus } = props;
    const [value, setValue] = useState(defaultValue);
    const input = useRef(null);

    function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (type === 'checkbox') {
            setValue((e.target.checked as unknown) as typeof defaultValue);
        } else {
            setValue(e.target.value);
        }
    }

    useEffect(() => {
        if (autoFocus) {
            const isBrowser = typeof window !== `undefined`;
            if (window.innerWidth > 768) {
                input.current.focus();
            }
        }
    });

    const inputField: JSX.Element = (
        <div className={`input-wrapper ${type}`}>
            {label && (
                <label htmlFor={id} className="label">
                    {label}
                </label>
            )}
            <input
                ref={input}
                onChange={onInputChange}
                defaultValue={value}
                name={id}
                id={id}
                type={type}
                placeholder={placeholder}
            />
        </div>
    );

    return [value, inputField, setValue];
}
export { useInput, Input };
export default useInput;
