'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useSession } from 'next-auth/react';

interface keluhanProp {
    id_keluhan: number
}

const Solution: React.FC<keluhanProp> = ({id_keluhan}) => {
  const { data: session } = useSession();
  const [solution, setSolution] = useState('');

  const handleSolutionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSolution = e.target.value;
    setSolution(newSolution);
  };

//   const showComplaint = async ()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Call your API endpoint to file a complaint
    const res = await fetch(`/api/layanan/solution/${id_keluhan}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_keluhan: id_keluhan, // Assuming you have the residentId in the session
        solusi: solution,
      }),
    });

    // Handle the response from the server as needed
    const result = await res.json();
    console.log(result);
  };
  
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Give Solution</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label style={{ marginBottom: '10px' }}>
          Give The Solution:
          <input style={{ padding: '8px', fontSize: '16px', color: 'black', width: '100%', boxSizing: 'border-box', marginBottom: '10px' }} type="text" value={solution} onChange={handleSolutionChange} />
        </label>
        <button style={{ padding: '10px', fontSize: '18px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} type="submit">Send Solution</button>
      </form>
    </div>
  );
}

export default Solution