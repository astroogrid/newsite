
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center">
      <span className="text-xl font-bold text-shop-black">AGrid</span>
    </Link>
  );
};

export default Logo;
