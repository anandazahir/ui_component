import React, { ReactNode } from "react";

interface DButtonProps {
  children: ReactNode; // `children` prop to allow custom content inside the button
}

export const Button3D: React.FC<DButtonProps> = ({ children }) => {
  return (
    <div className="relative w-fit group">
      <button className="z-20 relative rounded-md font-mono p-3 dark:bg-black bg-white text-black dark:text-white dark:border-white border-black border-4 transition-transform duration-200 group-hover:translate-y-1 group-hover:translate-x-1 group-focus:translate-y-1 group-focus:translate-x-1">
        {children} {/* Render the children inside the button */}
      </button>
      <div className="dark:bg-white bg-black rounded-md absolute w-full h-full top-2 left-2 z-0 scale-x-[1.0] transition-all duration-200 group-hover:top-2 group-hover:scale-x-[1.0] group-focus:top-1 group-focus:left-1"></div>
    </div>
  );
};
