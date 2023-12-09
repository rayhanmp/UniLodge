// pages/laundry.js
'use client'

import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Laundry() {
  const { data: session } = useSession();
  const [weight, setWeight] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWeight = e.target.value;
    setWeight(newWeight);

    // Calculate total price based on the formula (7000 * weight)
    const newTotalPrice = 7000 * parseInt(newWeight, 10);
    setTotalPrice(newTotalPrice);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Call your API endpoint to create a laundry order
    const res = await fetch('/api/layanan/laundry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        residentId: session?.user.id, // Assuming you have the residentId in the session
        weight: parseInt(weight, 10),
      }),
    });

    // Handle the response from the server as needed
    const result = await res.json();
    console.log(result);
  };

  return (
    <div>
      <h1>Laundry Order</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Weight (in kg):
          <input type="number" value={weight} onChange={handleWeightChange} />
        </label>
        <p>Total Price: {totalPrice}</p>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}
