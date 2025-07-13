"use client";

import { CircleQuestionMark } from "lucide-react";

export default function ToolTip({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="group relative">
                <CircleQuestionMark
                    size={16}
                    className="text-gray600 cursor-help"
                />
                <div className="bg-gray1000/90 b2 bg-blur pointer-events-none absolute top-0 left-0 z-10 mt-6 w-60 -translate-x-1/3 rounded-xl px-3 py-2 text-white opacity-0 shadow-md transition-opacity duration-200 ease-in-out group-hover:opacity-100">
                    {children}
                    <div className="border-b-gray1000/90 absolute top-[-6px] left-1/3 h-0 w-0 border-x-8 border-b-[8px] border-x-transparent"></div>
                </div>
            </div>
        </>
    );
}
