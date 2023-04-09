import React, { useState } from 'react';

const Input = ({type, children, value, setValue}) => {
    const [isHoverActive, setIsHoverActive] = useState(false);
    const [isFocusActive, setIsFocusActive] = useState(false);

    const handleFocus = () => {
        setIsFocusActive(true);
    };

    const handleBlur = () => {
        setIsFocusActive(false);
    };

    const handleHover = () => {
        setIsHoverActive(!isHoverActive);
    };

    return (
        <div
            style={{
                width: '350px',
                height: '50px',
                position: 'relative',
                transition: 'all 500ms',
            }}
        >
            <input
                style={{
                    padding: '15px 20px 0px 20px',
                    width: '100%',
                    height: '100%',
                    background: 'transparent',
                    border: '1px solid transparent',
                    position: 'relative',
                    transition: 'all 500ms',
                    fontSize: '20px',
                    fontWeight: '500',
                    lineHeight: '30px',
                    borderBottom: isFocusActive || isHoverActive ? '1px solid #AF49FF' : '1px solid rgba(175, 73, 255, 0.4)',
                    zIndex: "10"
                }}
                type={type}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onMouseOver={handleHover}
                onMouseLeave={handleHover}
                onChange={(e) => setValue(e.target.value)}
                value={value}

            />
            <div
                style={{
                    transition: 'all 500ms',
                    position: 'absolute',
                    content: 'Login',
                    left: '20px',
                    top: isFocusActive || isHoverActive || value ? '0' : '10px',
                    fontSize: isFocusActive || isHoverActive || value ? '10px' : '25px',
                    fontWeight: '500',
                    lineHeight: '30px',
                    color: 'rgba(175, 73, 255, 0.4)',
                    zIndex: "0"
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default Input;
