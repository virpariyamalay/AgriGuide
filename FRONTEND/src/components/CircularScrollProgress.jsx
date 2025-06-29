import React, { useEffect, useState } from "react";

const size = 56; // diameter in px
const strokeWidth = 6;
const radius = (size - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;

const CircularScrollProgress = () => {
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

    const offset = circumference - (scroll / 100) * circumference;

    return (
        <div style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 1000,
            background: "rgba(30,41,59,0.7)",
            borderRadius: "50%",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            padding: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <svg width={size} height={size}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#e5e7eb"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#34d399"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.2s" }}
                />
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dy="0.35em"
                    fontSize="1rem"
                    fill="#6ee7b7"
                    fontWeight="bold"
                >
                    {Math.round(scroll)}%
                </text>
            </svg>
        </div>
    );
};

export default CircularScrollProgress; 