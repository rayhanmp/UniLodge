'use client'

import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface FoodMenu {
  id_food: number;
  food_name: string;
  price: number;
  description: string;
}

interface FoodCardProps {
  foodMenu: FoodMenu;
}

const FoodCard: React.FC<FoodCardProps> = ({ foodMenu }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleButtonClick = () => {router.push(`/pages/foodorder/${foodMenu.id_food}`);};

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 mb-4 cursor-pointer hover:shadow-lg transition-all`}>
      <h2 className="text-gray-700 text-xl text-rich-black font-bold mb-2">{foodMenu.food_name}</h2>
      <p className="text-gray-700 mb-4">Rp {foodMenu.price}</p>
      <p className="text-gray-700 mb-4">{foodMenu.description}</p>

      <button
        onClick={handleButtonClick}
        className={`bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded transition-all`}
      >
        Order Food
      </button>
    </div>
  );
};


export default FoodCard;