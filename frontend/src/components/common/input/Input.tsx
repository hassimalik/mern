import React from 'react'
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{}

export default function Input({
    className="",
    ...props
}:InputProps){
    return (
        <input className={`border  rounded-md px-3 py-2 outline-none ${className}`} {...props}  />
    )
}