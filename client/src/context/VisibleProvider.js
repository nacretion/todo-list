import {useEffect, useState} from 'react';
import { VisibleContext } from './VisibleContext';

const VisibleProvider = ({ children }) => {

    const [scrollY, setScrollY] = useState(window.scrollY)

    const visibleValues = {
        scrollY, setScrollY
    };
    useEffect(() => {

        if (document) {
            document.addEventListener("scroll", () => {
                setScrollY(window.scrollY)
            })
        }
    },[window.scrollY])

    return <VisibleContext.Provider value={visibleValues}>{children}</VisibleContext.Provider>;
};

export default VisibleProvider;
