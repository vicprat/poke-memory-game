import { ReactNode, MouseEventHandler } from 'react'

interface ButtonProps {
    children: ReactNode,
    onClick?: MouseEventHandler<HTMLButtonElement>
}


const Button: React.FC<ButtonProps> = ({children, onClick}) => {
  return (
    <button 
        className="mt-4 rounded-md bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        onClick={onClick}
        >{children}
    </button>
  )
}

export default Button