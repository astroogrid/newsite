
import React from 'react';
import { Link } from 'react-router-dom';

const HomeFooter: React.FC = () => {
  return (
    <footer className="bg-shop-bg-gray py-10">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold text-lg mb-4">MOMENT</h4>
          <p className="text-shop-dark-gray">
            Creating premium products for photographers and filmmakers.
          </p>
        </div>

        <div>
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
        </div>

        <div>
          <h4 className="font-medium mb-4">Support</h4>
          <ul className="space-y-2 text-shop-dark-gray">
            <li>
              <Link to="/" className="hover:text-shop-blue">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-shop-blue">
                Shipping
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-shop-blue">
                Returns
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-shop-blue">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

      
      </div>
    </footer>
  );
};

export default HomeFooter;
