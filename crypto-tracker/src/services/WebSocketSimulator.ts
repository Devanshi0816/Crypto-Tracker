import { store } from '../store';
import { updateCryptoPrice } from '../store/cryptoSlice';
import { selectAllCryptos } from '../store/selectors';

export class WebSocketSimulator {
  private intervalId: number | null = null;
  private updateInterval: number = 2000; // 2 seconds
  
  constructor(updateIntervalMs = 2000) {
    this.updateInterval = updateIntervalMs;
  }
  
  connect(): void {
    if (this.intervalId !== null) {
      this.disconnect();
    }
    
    this.intervalId = window.setInterval(() => {
      this.simulateUpdate();
    }, this.updateInterval);
    
    console.log('WebSocket simulator connected');
  }
  
  disconnect(): void {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('WebSocket simulator disconnected');
    }
  }
  
  private simulateUpdate(): void {
    const cryptos = selectAllCryptos(store.getState());
    
    cryptos.forEach(crypto => {
      // Generate random changes for prices and percentages
      const priceChange = crypto.price * (Math.random() * 0.02 - 0.01); // -1% to +1%
      const newPrice = Math.max(0.000001, crypto.price + priceChange);
      
      const newPercentChange1h = crypto.percentChange1h + (Math.random() * 0.4 - 0.2); // -0.2% to +0.2%
      const newPercentChange24h = crypto.percentChange24h + (Math.random() * 0.4 - 0.2); // -0.2% to +0.2%
      
      // Volume can fluctuate more
      const volumeChange = crypto.volume24h * (Math.random() * 0.1 - 0.05); // -5% to +5%
      const newVolume = Math.max(1000, crypto.volume24h + volumeChange);
      
      // Dispatch update to Redux store
      store.dispatch(
        updateCryptoPrice({
          id: crypto.id,
          price: newPrice,
          percentChange1h: newPercentChange1h,
          percentChange24h: newPercentChange24h,
          volume24h: newVolume,
        })
      );
    });
  }
}

export default new WebSocketSimulator();