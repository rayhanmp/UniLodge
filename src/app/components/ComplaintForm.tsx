'use client'

import { useState, ChangeEvent, FormEvent } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'

export default function Complaint() {
  const router = useRouter();
  const { data: session } = useSession();
  const [complaint, setComplaint] = useState('');

  const handleComplaintChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newComplaint = e.target.value;
    setComplaint(newComplaint);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Call your API endpoint to file a complaint
    const res = await fetch('/api/layanan/keluhan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_resident: session?.user.id, // Assuming you have the residentId in the session
        keluhan: complaint,
      }),
    });

    if (res.ok){
      alert('Complaint submitted! It will be reviewed soon!')
      router.push('/')
    }

    // Handle the response from the server as needed
    const result = await res.json();
    console.log(result);
  };
  
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ textAlign: 'center', color: 'white' }}>File  Complaint</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label style={{ marginBottom: '10px' }}>
          Write Your Complaint:
          <input style={{ padding: '8px', fontSize: '16px', color: 'black', width: '100%', boxSizing: 'border-box', marginBottom: '10px' }} type="text" value={complaint} onChange={handleComplaintChange} />
        </label>
        <button style={{ padding: '10px', fontSize: '18px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} type="submit">Send Complaint</button>
      </form>
    </div>
  );
}