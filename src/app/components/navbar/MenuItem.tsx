"use client"

import { ReactNode } from "react"

interface MenuItemProps {
    onClick: () => void
    label?:  string
    icon?: ReactNode
}
 
const MenuItem:React.FC<MenuItemProps> = ({onClick, label, icon}) => {
  return (
    <div
    onClick={onClick} 
    className="
    px-4
    py-3
    hover:bg-neutral-100
    transition
    font-semibold
    ">
      {icon}
      {label}
    </div>
  )
}

export default MenuItem
