"use client";

import { Slide, toast, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastOptions = {
    message: string;
    linkLabel?: string;
    onClick?: () => void;
};

const commonOptions = {
    position: "top-center" as ToastPosition,
    hideProgressBar: true,
    pauseOnHover: true,
    transition: Slide,
    autoClose: 3000,
    closeOnClick: true,
    draggable: true,
    closeButton: false,
};

export function customAlert({ message, linkLabel, onClick }: ToastOptions) {
    const isDark =
        typeof window !== "undefined" &&
        document.documentElement.classList.contains("dark");

    toast(
        ({ closeToast }) => (
            <div className="items flex w-full justify-between gap-4">
                <h6 className={isDark ? "text-white" : "text-gray1000"}>
                    {message}
                </h6>
                {linkLabel && onClick && (
                    <button
                        onClick={() => {
                            onClick();
                            closeToast();
                        }}
                        className="text-main400 h6 cursor-pointer"
                    >
                        {linkLabel}
                    </button>
                )}
            </div>
        ),
        {
            ...commonOptions,
            theme: isDark ? "dark" : "light",
            style: {
                color: isDark ? "#fff" : "#000",
                backgroundColor: isDark ? "#2f2f2f" : "#ffffff",
                whiteSpace: "pre-wrap",
                minWidth: "328px",
                width: "fit-content",
                margin: "12px",
                padding: "16px",
                borderRadius: "16px",
                opacity: "90%",
                boxShadow: "0px 4px 16px 0px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(24px)",
            },
        },
    );
}
