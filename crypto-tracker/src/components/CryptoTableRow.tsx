import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
} from 'chart.js';
import { Cryptocurrency } from '../types';
import { 
  formatCurrency, 
  formatPercentage, 
  formatCompactNumber, 
  getPercentageColor, 
  getPercentageIcon
} from '../utils/formatters';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

interface CryptoTableRowProps {
  crypto: Cryptocurrency;
}

const CryptoTableRow: React.FC<CryptoTableRowProps> = ({ crypto }) => {
  const [prevPrice, setPrevPrice] = useState(crypto.price);
  const [priceFlash, setPriceFlash] = useState<'flash-green' | 'flash-red' | ''>('');
  
  useEffect(() => {
    // Set previous price for comparison on next update
    if (crypto.price !== prevPrice) {
      setPriceFlash(crypto.price > prevPrice ? 'flash-green' : 'flash-red');
      const timer = setTimeout(() => setPriceFlash(''), 1000);
      setPrevPrice(crypto.price);
      return () => clearTimeout(timer);
    }
  }, [crypto.price, prevPrice]);
  
  // Chart configuration
  const chartData = {
    labels: ['', '', '', '', '', '', ''],
    datasets: [
      {
        data: crypto.chartData,
        fill: true,
        borderColor: crypto.percentChange7d >= 0 ? 'rgba(52, 211, 153, 1)' : 'rgba(239, 68, 68, 1)',
        backgroundColor: crypto.percentChange7d >= 0 ? 'rgba(52, 211, 153, 0.1)' : 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
  };
  
  return (
    <tr className="hover:bg-gray-800 transition-colors duration-150">
      <td className="sticky left-0 z-10 px-3 py-4 text-sm font-medium text-gray-300 bg-gray-900 whitespace-nowrap group-hover:bg-gray-800">
        {crypto.rank}
      </td>
      <td className="sticky left-12 z-10 px-3 py-4 text-sm font-medium text-white bg-gray-900 whitespace-nowrap group-hover:bg-gray-800">
        <div className="flex items-center gap-3">
          <img src={crypto.logoUrl} alt={crypto.name} className="w-6 h-6" />
          <div>
            <div className="font-medium">{crypto.name}</div>
            <div className="text-xs text-gray-400">{crypto.symbol}</div>
          </div>
        </div>
      </td>
      <td className={`px-3 py-4 text-sm text-right text-white whitespace-nowrap ${priceFlash}`}>
        {formatCurrency(crypto.price)}
      </td>
      <td className={`px-3 py-4 text-sm text-right whitespace-nowrap ${getPercentageColor(crypto.percentChange1h)}`}>
        <div className="flex items-center justify-end gap-1">
          <span>{getPercentageIcon(crypto.percentChange1h)}</span>
          <span>{formatPercentage(crypto.percentChange1h)}</span>
        </div>
      </td>
      <td className={`px-3 py-4 text-sm text-right whitespace-nowrap ${getPercentageColor(crypto.percentChange24h)}`}>
        <div className="flex items-center justify-end gap-1">
          <span>{getPercentageIcon(crypto.percentChange24h)}</span>
          <span>{formatPercentage(crypto.percentChange24h)}</span>
        </div>
      </td>
      <td className={`px-3 py-4 text-sm text-right whitespace-nowrap ${getPercentageColor(crypto.percentChange7d)}`}>
        <div className="flex items-center justify-end gap-1">
          <span>{getPercentageIcon(crypto.percentChange7d)}</span>
          <span>{formatPercentage(crypto.percentChange7d)}</span>
        </div>
      </td>
      <td className="px-3 py-4 text-sm text-right text-white whitespace-nowrap">
        {formatCurrency(crypto.marketCap)}
      </td>
      <td className="px-3 py-4 text-sm text-right text-white whitespace-nowrap">
        {formatCurrency(crypto.volume24h)}
        <div className="text-xs text-gray-400">{formatCompactNumber(crypto.volume24h / crypto.price)} {crypto.symbol}</div>
      </td>
      <td className="px-3 py-4 text-sm text-right text-white whitespace-nowrap">
        {formatCompactNumber(crypto.circulatingSupply)} {crypto.symbol}
        {crypto.maxSupply && (
          <div className="mt-1 h-1.5 w-24 bg-gray-700 rounded-full ml-auto">
            <div
              className="h-1.5 bg-blue-500 rounded-full"
              style={{ width: `${(crypto.circulatingSupply / crypto.maxSupply) * 100}%` }}
            ></div>
          </div>
        )}
      </td>
      <td className="px-3 py-4 w-32">
        <div className="h-16">
          <Line data={chartData} options={chartOptions} />
        </div>
      </td>
    </tr>
  );
};

export default CryptoTableRow;