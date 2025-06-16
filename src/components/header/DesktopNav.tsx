
import React from 'react';
import { Link } from 'react-router-dom';
import { mainMenu } from '@/data/menu';

const DesktopNav: React.FC = () => {
  return (
    <div className="hidden md:flex">
      {mainMenu.map(item => (
        <Link 
          key={item.id} 
          to={item.link} 
          className="text-shop-dark-gray hover:text-shop-blue transition-colors px-4"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default DesktopNav;
