'use client'

import {useState, ChangeEvent, FormEvent} from 'react';
import {useSession} from 'next-auth/react';
import {white} from "next/dist/lib/picocolors";

export default function Laundry() {
    const {data: session} = useSession();
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
                residentId: session?.user?.id, // Assuming you have the residentId in the session
                weight: parseInt(weight, 10),
            }),
        });

        // Handle the response from the server as needed
        const result = await res.json();
        console.log(result);
    };

    return (
        // <div>
        //   <h1>Laundry Order</h1>
        //   <form onSubmit={handleSubmit}>
        //     <label>
        //       Weight (in kg):
        //       <input type="number" value={weight} onChange={handleWeightChange} />
        //     </label>
        //     <p>Total Price: {totalPrice}</p>
        //     <button type="submit">Place Order</button>
        //   </form>
        // </div>
        <div style={{
            maxWidth: '400px',
            margin: '0 auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
        }}>
            <h1 style={{textAlign: 'center', color: '#333'}}>Laundry Order</h1>
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <label style={{marginBottom: '10px'}}>
                    Weight (in kg):
                    <input style={{
                        padding: '8px',
                        fontSize: '16px',
                        width: '100%',
                        boxSizing: 'border-box',
                        marginBottom: '10px'
                    }} type="number" value={weight} onChange={handleWeightChange}/>
                </label>
                <p style={{fontSize: '18px', fontWeight: 'bold', marginTop: '10px'}}>Total Price: {totalPrice}</p>
                <button style={{
                    padding: '10px',
                    fontSize: '18px',
                    backgroundColor: '#4caf50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }} type="submit">Place Order
                </button>
            </form>
        </div>
    );
}
