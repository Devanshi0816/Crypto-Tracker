import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCryptosByRank } from '../store/selectors';
import CryptoTableRow from './CryptoTableRow';
import { InfoIcon } from 'lucide-react';

const CryptoTable: React.FC = () => {
  const [isScrollable, setIsScrollable] = useState(false);
  const cryptos = useSelector(selectCryptosByRank);
  
  // Check if the table is scrollable on resize
  useEffect(() => {
    const checkScrollable = () => {
      const tableContainer = document.getElementById('table-container');
      if (tableContainer) {
        setIsScrollable(tableContainer.scrollWidth > tableContainer.clientWidth);
      }
    };
    
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    
    return () => {
      window.removeEventListener('resize', checkScrollable);
    };
  }, []);
  
  return (
    <div className="w-full overflow-hidden bg-gray-900 rounded-lg shadow-lg">
      <div className="px-4 py-3 bg-gray-800 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white">Top Cryptocurrencies</h2>
      </div>
      
      {isScrollable && (
        <div className="px-4 py-2 text-sm text-blue-300 bg-blue-900/20 border-b border-gray-700">
          <div className="flex items-center gap-1">
            <InfoIcon size={16} />
            <span>Scroll horizontally to view all data</span>
          </div>
        </div>
      )}
      
      <div id="table-container" className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th scope="col" className="sticky left-0 z-10 px-3 py-3.5 text-left text-sm font-semibold text-white bg-gray-800">#</th>
              <th scope="col" className="sticky left-12 z-10 px-3 py-3.5 text-left text-sm font-semibold text-white bg-gray-800">Name</th>
              <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-white">Price</th>
              <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-white">1h %</th>
              <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-white">24h %</th>
              <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-white">7d %</th>
              <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-white">Market Cap</th>
              <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-white">Volume(24h)</th>
              <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-white">Circulating Supply</th>
              <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-white">Last 7 Days</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700 bg-gray-900">
            {cryptos.map((crypto) => (
              <CryptoTableRow key={crypto.id} crypto={crypto} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTable;