import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-8 py-6 bg-gray-900 border-t border-gray-800">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} CryptoTrack. All prices are for demonstration purposes only.
            </p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              About
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;