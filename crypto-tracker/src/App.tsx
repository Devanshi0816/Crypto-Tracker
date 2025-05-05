import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import WebSocketSimulator from './services/WebSocketSimulator';
import Header from './components/Header';
import CryptoTable from './components/CryptoTable';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Connect to WebSocket simulator when component mounts
    WebSocketSimulator.connect();
    
    // Disconnect when component unmounts
    return () => {
      WebSocketSimulator.disconnect();
    };
  }, []);

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-950 text-white">
        <Header />
        <main className="container px-4 mx-auto py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Cryptocurrency Prices</h2>
            <p className="text-gray-400">
              Real-time price updates for top cryptocurrencies by market capitalization
            </p>
          </div>
          <CryptoTable />
        </main>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;