import React from "react";

interface ButtonProps {
    linkTitle: string;
    center?: boolean;
    className?: string;
    onClick?: () => void; // Adding an onClick event handler
}

const Button: React.FC<ButtonProps> = ({ linkTitle, center, className, onClick }) => {
    const buttonClasses = `bg-slate-800 text-white p-4 pl-6 pr-6 rounded-lg hover:bg-slate-600 duration-500 max-w-fit my-2 block group-hover:bg-blue-900 hover:cursor-pointer ${center ? 'm-auto' : ''} ${className || ''}`;

    return (
        <button
            type="button"
            className={buttonClasses.trim()}
            onClick={onClick} // Assign the onClick event handler
        >
            {linkTitle}
        </button>
    );
};

export default Button;