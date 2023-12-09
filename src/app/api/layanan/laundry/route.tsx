import db from "../../../../../prisma/db";
import { NextResponse } from 'next/server';

export async function POST(req: Request){
    if (req.method === 'POST'){
        try {
            const body = await req.json();
            const {residentId, weight} = body;
            const residentIdInt = parseInt(residentId, 10);
            if (isNaN(residentIdInt)) {
                throw new Error("Invalid residentId");
        }

        const newOrder = await db.laundry.create({
            data: {
              residentId,
              weight,
            },
        });

        return NextResponse.json({success: true, data: newOrder, message: "Order successful!"});
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