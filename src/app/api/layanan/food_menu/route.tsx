import db from "../../../../../prisma/db";
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const foodMenu = await db.foodMenu.findMany();
    return NextResponse.json(foodMenu);
  } catch (error) {
    console.error('Error fetching food menu:', error);
    return NextResponse.error();
  } finally {
    await db.$disconnect();
  }
}

export async function POST() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405});
}
