import db from "../../../../../../prisma/db";
import { NextResponse } from 'next/server';

export async function GET(request: Request, {params}: {params: {id: number}}) {

  if (!params.id) {
    return NextResponse.json({ status: 400, message: 'Bad Request' });
  }
  const parsedFoodMenuID = Number(params.id);

  try {
    const foodMenuDetails = await db.foodMenu.findUnique({
      where: {
        id_food: parsedFoodMenuID,
      },
    });

    if (foodMenuDetails) {
      return NextResponse.json(foodMenuDetails);
    } else {
      return NextResponse.json({ status: 404, message: 'Food menu not found' });
    }
  } catch (error) {
    console.error('Error fetching food menu details:', error);
    return NextResponse.json({ status: 500, message: 'Internal Server Error' });
  } finally {
    await db.$disconnect();
  }
}
