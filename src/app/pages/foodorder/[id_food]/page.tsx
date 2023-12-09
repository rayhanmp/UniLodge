'use client';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

interface FoodOrder {
  id_food: number;
  food_name: string;
  price: number;
  description: string;
}

async function getFoodOrder(id_food: string): Promise<FoodOrder> {
  const res = await fetch(`/api/layanan/food_menu/${id_food}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
}

const FoodOrderDetails = () => {
  const { id_food } = useParams();
  const { data: session } = useSession();
  const [isFoodOrderd, setIsFoodOrderd] = useState(false);
  const [foodOrder, setFoodOrder] = useState<FoodOrder | null>(null);

  useEffect(() => {
    const fetchFoodOrder = async () => {
      if (id_food) {
        try {
          const foodOrderData: FoodOrder = await getFoodOrder(id_food as string);
          console.log('FoodOrder Data:', foodOrderData);
          setFoodOrder(foodOrderData);
        } catch (error) {
          console.error('Error fetching food order data:', error);
        }
      }
    };
  
    fetchFoodOrder();
  }, [id_food]);
  

  const handleFoodOrder = async () => {
      const residentId = session?.user.id;
    try{
      const response = await fetch('/api/layanan/food_order/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          residentId: session?.user.id, 
          id_food: parseInt(id_food as string, 10) }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Purchase created successfully:', data);
        setIsFoodOrderd(true);
      } else {
        const errorData = await response.json();
        console.error('Error creating purchase:', errorData);
      }

    } catch(error){
      console.log(error)
    }
  };

  if (!foodOrder) {
    return <div>Page is loading...</div>;
  }

  return (
    <main>
      <div className='flex justify-center'>
      <div className="card bg-neutral shadow-lg rounded-lg p-6 w-full max-w-sm mt-16">
        <h2 className='text-xl text-center text-bold text-white'>Your Purchase Detail</h2>
        <h3 className='my-4 text-white'>Food name : {foodOrder.food_name}</h3>
        <h3 className='mb-4 text-white'>Total price : {foodOrder.price}</h3>
        {!isFoodOrderd && (
          <button onClick={handleFoodOrder} className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded transition-all">
            Order Now
          </button>
        )}
        {isFoodOrderd && <p className='text-green-600 text-center'>Order Successful!</p>}
      </div>
      </div>
    </main>
  );
};

export default FoodOrderDetails;
