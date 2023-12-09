'use client';
import React, { useEffect, useState } from 'react';
import FoodCard from '../components/FoodCard';

interface FoodMenu {
    id_food: number;
    food_name: string;
    price: number;
    description: string;
  }

const FoodList = () => {
  const [foodMenus, setFoods] = useState<FoodMenu[]>([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch('/api/layanan/food_menu');
        if (!response.ok) {
          throw new Error(`Failed to fetch food menu. Status: ${response.status}`);
        }

        const data = await response.json();
        setFoods(data);
      } catch (error) {
        console.error('Error fetching food menu:', error);
      }
    };

    fetchFoods();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {foodMenus.map((foodMenu) => (
        <FoodCard key={foodMenu.id_food} foodMenu={foodMenu} />
      ))}
    </div>
  );
};

export default FoodList;
