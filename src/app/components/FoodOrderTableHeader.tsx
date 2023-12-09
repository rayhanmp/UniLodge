import React from 'react';

const FoodOrderTableHeader = () => {
  return (
    <div className="bg-[#537895] text-rich-black p-4 rounded grid grid-cols-4 gap-4 mt-8 mb-4">
      <div className="font-bold text-center text-neutral-content">Order ID</div>
      <div className="font-bold text-center text-neutral-content">Resident</div>
      <div className="font-bold text-center text-neutral-content">Food Menu</div>
      <div className="font-bold text-center text-neutral-content">Status</div>
    </div>
  );
};

export default FoodOrderTableHeader;
