
import React from 'react';
import { Link } from 'react-router-dom';

const HomeFooter: React.FC = () => {
  return (
    <footer className="bg-shop-bg-gray py-4">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h4 className="font-bold text-lg mb-1">AstrooGrid &copy; 2025</h4>
          <p className="text-shop-dark-gray text-sm">
            We are a trusted team of skilled astrologers, sages, pundits, and experts, offering authentic guidance and genuine astrological products
          </p>
        </div>

        {/* <div>
          <h4 className="font-medium mb-4">Shop</h4>
          <ul className="space-y-2 text-shop-dark-gray">
            <li>
              <Link to="/product" className="hover:text-shop-blue">
                New Arrivals
              </Link>
            </li>
            <li>
              <Link to="/product" className="hover:text-shop-blue">
                Best Sellers
              </Link>
            </li>
            <li>
              <Link to="/product" className="hover:text-shop-blue">
                Cameras
              </Link>
            </li>
            <li>
              <Link to="/product" className="hover:text-shop-blue">
                Lenses
              </Link>
            </li>
          </ul>
        </div> */}

      </div>
    </footer>
  );
};

export default HomeFooter;
