import "../../css/index.css";
import localfont from "next/font/local";
const pretendard = localfont({
    variable: "--font-pretendard",
    src: "../../assets/fonts/PretendardVariable.woff2",
});

export const metadata = {
    title: "스터디 생성 | Studium",
    description: "Generated by Next.js",
};

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div
                className={`m-auto h-screen w-screen max-w-sm ${pretendard.variable}`}
            >
                {children}
            </div>
        </>
    );
}
