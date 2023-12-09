import React from 'react';
import FoodList from '../../components/FoodList';

const FoodMenu = () => {
  return (
    <div className="container mx-auto mt-8 p-10">
      <h1 className="text-3xl font-bold mb-6">Available Food Menus</h1>
      <FoodList />
    </div>
  );
};

export default FoodMenu;
