import React from "react";

interface ButtonProps {
    href?: string;
    linkTitle: string;
    onClickEvent?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    center?: boolean;
    className?: string; // New prop for additional classNames
    children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ href, linkTitle, onClickEvent, center, className }) => {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (onClickEvent) {
            onClickEvent(event);
        }
    };

    const buttonClasses = `bg-slate-800 text-white p-4 pl-6 pr-6 rounded-lg hover:bg-slate-600 duration-500 max-w-fit my-2 block group-hover:bg-blue-900 ${center ? 'm-auto' : ''} ${className || ''}`;

    return (
        <a
            href={href}
            onClick={handleClick}
            className={buttonClasses.trim()} // Trim to handle extra spaces
        >
            {linkTitle}
        </a>
    );
};

export default Button;