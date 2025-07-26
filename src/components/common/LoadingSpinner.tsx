"use client";

export default function LoadingSpinner() {
    return (
        <>
            <div className="flex h-fit items-center justify-center">
                <div className="border-main400 h-10 w-10 animate-spin rounded-full border-4 border-t-transparent"></div>
            </div>
        </>
    );
}
