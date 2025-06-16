
import React from 'react';

const PageFooter: React.FC = () => {
  return (
    <footer className="bg-shop-bg-gray py-10 mt-20">
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
            <li><a href="#" className="hover:text-shop-blue">New Arrivals</a></li>
            <li><a href="#" className="hover:text-shop-blue">Best Sellers</a></li>
            <li><a href="#" className="hover:text-shop-blue">Cameras</a></li>
            <li><a href="#" className="hover:text-shop-blue">Lenses</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium mb-4">Support</h4>
          <ul className="space-y-2 text-shop-dark-gray">
            <li><a href="#" className="hover:text-shop-blue">Help Center</a></li>
            <li><a href="#" className="hover:text-shop-blue">Shipping</a></li>
            <li><a href="#" className="hover:text-shop-blue">Returns</a></li>
            <li><a href="#" className="hover:text-shop-blue">Contact Us</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium mb-4">Newsletter</h4>
          <p className="text-shop-dark-gray mb-4">
            Subscribe to get special offers and once-in-a-lifetime deals.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 rounded-l px-4 py-2 border border-shop-light-gray focus:outline-none focus:ring-1 focus:ring-shop-blue"
            />
            <button className="bg-shop-blue text-white px-4 py-2 rounded-r hover:bg-shop-light-blue transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;
