interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    children: React.ReactNode;
}

export default function Input({ children, value, ...props }: InputProps) {
    return (
        <>
            <div className="dark:border-gray800 relative h-[62px] w-full rounded-[12px] border border-gray-300 duration-200">
                <input
                    className="peer text-gray1000 h-full w-full pt-4 pl-4 transition-all duration-200 focus:outline-none dark:text-white"
                    {...props}
                />
                <label
                    className={`text-gray500 dark:text-gray700 absolute top-1/2 left-4 -translate-y-1/2 transition-all duration-200 peer-focus:top-5 peer-focus:text-xs ${value && "top-5 text-xs"}`}
                >
                    {children}
                </label>
            </div>
        </>
    );
}
