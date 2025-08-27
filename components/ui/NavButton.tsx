import React from 'react';

interface NavButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ label, isActive, onClick }) => {
  const baseClasses = "w-full text-left px-4 py-2 rounded-lg text-md font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75";
  const activeClasses = "bg-sky-500 text-white shadow-md";
  const inactiveClasses = "text-slate-600 hover:bg-sky-100 hover:text-sky-600";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </button>
  );
};

export default NavButton;
