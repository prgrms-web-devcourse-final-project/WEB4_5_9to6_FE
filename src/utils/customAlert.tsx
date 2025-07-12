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
    theme: "light",
    transition: Slide,
    autoClose: 3000,
    closeOnClick: true,
    draggable: true,
    closeButton: false,
    style: {
        color: "#000",
        backgroundColor: "#fff",
        whiteSpace: "pre-wrap",
        width: "fit-content",
        margin: "16px",
        padding: "16px",
        borderRadius: "16px",
    },
};

export function customAlert({ message, linkLabel, onClick }: ToastOptions) {
    toast(
        ({ closeToast }) => (
            <div className="flex w-fit items-center justify-center gap-4">
                <h6 className="text-gray1000">{message}</h6>
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
        },
    );
}
