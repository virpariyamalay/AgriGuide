import React, { useEffect, useState } from "react";

const ScrollBar = () => {
    const [scroll, setScroll] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setScroll(scrolled);
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "5px",
            background: "rgba(0,0,0,0.05)",
            zIndex: 9999
        }}>
            <div style={{
                width: `${scroll}%`,
                height: "100%",
                background: "linear-gradient(90deg, #34d399, #6366f1)",
                transition: "width 0.2s"
            }} />
        </div>
    );
};

export default ScrollBar; 