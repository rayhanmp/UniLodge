// app/classes/page.tsx
'use client'
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
//import { authOptions } from "@/lib/auth";
//import { getServerSession } from "next-auth";
import FoodOrderCard from "../../components/FoorOrderCard";
import FoodOrderTableHeader from "../../components/FoodOrderTableHeader";
// Assuming you have a type for your class data
interface FoodOrder {
    id_food_order: number;
    residentId: number;
    id_food: number;
    status: boolean;
  }

const FoodAdmin = () => {
  const { data: session, status } = useSession();
  const [foodOrder, setFoodOrderData] = useState<FoodOrder[]>([]);

  useEffect(() => {
    // Fetch users data
    const fetchData = async () => {
      try {
        const response = await fetch('/api/layanan/food_order');
        if (!response.ok) {
          throw new Error(`Failed to fetch food orders. Status: ${response.status}`);
        }
        const data = await response.json();
        setFoodOrderData(data)
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();

  }, [session]);


  return (
    <div className="container mx-auto mt-8 p-10">
      <div className=" grid grid-cols-2 gap-8">
        <h1 className="text-3xl font-bold mb-6">Food Orders</h1>
      </div>
      <FoodOrderTableHeader />
      <div className="grid gap-10 mt-4">
        {foodOrder.map((foodOrderInfo) => (
          <FoodOrderCard key={foodOrderInfo.residentId} {...foodOrderInfo} />
        ))}
      </div>
    </div>
  );
};

export default FoodAdmin;
