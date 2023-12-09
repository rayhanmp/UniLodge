import db from "../../../../../prisma/db";
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
    if (req.method === 'POST') {
        try {
          const body = await req.json();
          const {residentId, id_food} = body;
          const residentIdInt = parseInt(residentId, 10)
          const foodIDInt = parseInt(id_food, 10)
          if (isNaN(residentIdInt) ||isNaN(foodIDInt)) {
            throw new Error("Invalid residentId");
        }

          // Create a new purchase in the database
          const newFoodOrder = await db.foodOrder.create({
            data: {
              residentId,
              id_food,
            },
          });
    
          // Send a response with the newly created purchase
          // res.status(201).json({ success: true, data: newPurchase });
          return NextResponse.json({success: true, data: newFoodOrder, message: "Food order succeeded!"});
        } catch (error) {
            console.error('Error handling POST request:', error);
          // res.status(500).json({ success: false, error: 'Internal Server Error' });
            return NextResponse.json({message: "Something went wrong"}, {status: 500})
        }
      } else {
        // res.status(405).json({ success: false, error: 'Method Not Allowed' });
          return NextResponse.json({message: "Method not allowed"}, {status: 405})
      }
    }

    export async function GET() {
      try {
        const foodOrder = await db.foodOrder.findMany();
        return NextResponse.json(foodOrder);
      } catch (error) {
        console.error('Error fetching food order:', error);
        return NextResponse.error();
      } finally {
        await db.$disconnect();
      }
    }