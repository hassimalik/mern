import {ButtonHTMLAttributes, ReactNode} from "react";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    childern:ReactNode;
}

export default function Button({
    children,
    className = "",
    ...props
}: ButtonProps) {
    return (
        <button className={`px-4 py-2  transition-colors  rounded-md ${className}`}
        {...props}>
            {children}
        </button>
    )
}