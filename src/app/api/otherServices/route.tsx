import { NextResponse } from 'next/server';
import * as z from 'zod';
import db from '../../../../prisma/db';
import { other_services } from '../../../../types/models';
import {ZodBoolean, ZodNumber, ZodString} from "zod";

const serviceSchema = z.object({
    id: z.number(),
    username: z.string(),
    topic: z.string(),
    description: z.string(),
    preferredSolution: z.string(),
    resolved: z.boolean(),
});

export async function GET() {
    try {
        const otherServices = await db.other_services.findMany({
            orderBy: {
                id: 'asc',
            },
        });
        return NextResponse.json(otherServices, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching services:', error.message);
        return NextResponse.json('Internal Server Error', { status: 500 });
    } finally {
        await db.$disconnect();
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsedService = serviceSchema.parse(body);

        const service = await db.other_services.create({
            data: {
                ...parsedService,
            },
        });

        return NextResponse.json({ service, message: 'Service created successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error', error);
        return NextResponse.json('An error occurred', { status: 500 });
    }
}
