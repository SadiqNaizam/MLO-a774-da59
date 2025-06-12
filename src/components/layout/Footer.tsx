import React from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom for navigation links
import { Copyright } from 'lucide-react'; // Example icon

const Footer: React.FC = () => {
  console.log("Rendering Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto py-8 text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          {/* Column 1: About/Brand Info */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Your Bank Inc.</h3>
            <p>Committed to your financial success. Secure and reliable banking services.</p>
            {/* Could add address or contact info here */}
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li><Link to="/dashboard" className="hover:text-blue-600 hover:underline">Dashboard</Link></li>
              <li><Link to="/transactions" className="hover:text-blue-600 hover:underline">Transactions</Link></li>
              <li><Link to="/cards" className="hover:text-blue-600 hover:underline">Card Management</Link></li>
              <li><Link to="/support" className="hover:text-blue-600 hover:underline">Support</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal/Contact */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Legal</h3>
            <ul className="space-y-1">
              <li><Link to="/privacy" className="hover:text-blue-600 hover:underline">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-blue-600 hover:underline">Terms of Service</Link></li>
              <li><Link to="/contact-us" className="hover:text-blue-600 hover:underline">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-xs">
          <p className="flex items-center justify-center">
            <Copyright className="h-4 w-4 mr-1" /> {currentYear} Your Bank Inc. All rights reserved.
          </p>
          <p className="mt-1">This is a fictional banking application for demonstration purposes.</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;