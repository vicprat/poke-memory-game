import { ReactNode } from "react"

interface GridContainerProps {
  children: ReactNode;
  columns?: number | undefined;
}

const GridContainer: React.FC<GridContainerProps> = ({ children, columns=10 }) => {
  return (
    <div
    className={`grid grid-cols-4 gap-4 mt-8  ${
      columns >= 6 ? "md:grid-cols-8" : columns === 5 ? "md:grid-cols-5" : "md:grid-cols-20"
    }`}
  >
      {children}
    </div>
  );
};

export default GridContainer;
