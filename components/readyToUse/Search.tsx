'use client'
// YourComponent.tsx
import * as React from 'react';
import { useState } from 'react';
import { Input } from '../ui/input';

// fetchCoinById.ts
import axios from 'axios';

export const fetchCoinById = async (coinId: string) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_SEARCH}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching coin data:', error);
    throw error;
  }
};


const YourComponent: React.FC = () => {
  const [coinId, setCoinId] = useState<string>('');
  const [coinData, setCoinData] = useState<any>(null);

  const handleSearch = async () => {
    try {
      const data = await fetchCoinById(coinId);
      setCoinData(data);
    } catch (error) {
      // Handle error if needed
    }
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Enter Coin ID"
        value={coinId}
        onChange={(e) => setCoinId(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {coinData && (
        <div>
          <h2>{coinData.name}</h2>
          <p>Symbol: {coinData.symbol}</p>
        </div>
      )}
    </div>
  );
};

export default YourComponent;
