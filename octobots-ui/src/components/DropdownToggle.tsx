import React from 'react';

type Props = {
  children: React.ReactNode;
  onClick?: (e: React.FormEvent) => void;
  id?: string;
};

const DropdownToggle: React.FC<Props> = ({ children, onClick, id }) => {
  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center'}} onClick={handleClick} id={id && id}>
      {children}
    </div>
  );
};

export default DropdownToggle;
