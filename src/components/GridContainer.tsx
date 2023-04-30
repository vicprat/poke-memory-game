import { ReactNode } from "react"

interface GridContainerProps {
    children: ReactNode
}

const GridContainer:React.FC<GridContainerProps> = ({children}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-8">
        {children}
    </div>
  )
}

export default GridContainer