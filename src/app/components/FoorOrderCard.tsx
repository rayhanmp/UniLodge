// components/AccountCard.tsx
'use client';
import React, { useState } from 'react';

interface FoodOrderCardProps {
  id_food_order: number;
  residentId: number;
  id_food: number;
  status: boolean;
}

const FoodOrderCard: React.FC<FoodOrderCardProps> = ({
  id_food_order,
  residentId,
  id_food,
  status
}) => {

  return (
    <div className="card bg-white rounded-lg hover:shadow-lg p-4 grid grid-cols-4 gap-4 items-center">
      <div className="col-span-1 text-center text-gray-700">{`${id_food_order}`}</div>
      <div className="col-span-1 text-center text-gray-700">{`${residentId}`}</div>
      <div className="col-span-1 text-center text-gray-700">{`${id_food}`}</div>
      <div className="col-span-1 text-center text-gray-700">
        <button className="bg-[#537895] text-white hover:bg-blue-100 hover:text-black rounded px-4 py-2">
          Complete
        </button>
      </div>
    </div>
  );
};

export default FoodOrderCard;
