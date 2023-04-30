import { ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="block text-center">
            {children}
        </div>
    </div>
  )
}

export default Layout