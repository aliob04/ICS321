'use client'
import { IconType } from "react-icons";

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
}

const Button = ({ label, onClick, disabled, outline, small, icon: Icon }: ButtonProps) => {
    return (
        <button onClick={onClick} disabled={disabled} className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full ${outline ? 'bg-white border-black text-black' : 'bg-green-400 border-green-400 text-white'} ${small ? 'py-1 px-2 border-[1px] font-light' : 'py-3 px-4 border-2 font-se'}`}>
            {Icon && <Icon size={24} className="absolute left-4 top-3" />}
            {label}
        </button>
    )
}
export default Button