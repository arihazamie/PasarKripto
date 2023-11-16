'use client'
// ranking/[id]/page.tsx
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CoinDetails {
  id: string;
  name: string;
  symbol: string;
  // Add more details as needed
}

const CoinDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Get the coin id from the route parameters
  const [coinDetails, setCoinDetails] = useState<CoinDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCoinDetails() {
      setLoading(true);
      setError(null);

      if (id && typeof id === 'string') {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/coins/${id}`;
        
        try {
          const response = await axios.get(url);
          const coinData = response.data;

          // Map the relevant details to the CoinDetails interface
          const coinDetails: CoinDetails = {
            id: coinData.id,
            name: coinData.name,
            symbol: coinData.symbol,
            // Add more details as needed
          };

          setCoinDetails(coinDetails);
        } catch (error) {
          console.error(error);
          setError('Error fetching coin details');
        } finally {
          setLoading(false);
        }
      }
    }

    fetchCoinDetails();
  }, [id]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {coinDetails && (
        <div>
          <h1>{coinDetails.name}</h1>
          <p>ID: {coinDetails.id}</p>
          <p>Symbol: {coinDetails.symbol}</p>
          {/* Display other details as needed */}
        </div>
      )}
    </div>
  );
};

export default CoinDetailsPage;
