import db from "../../../../prisma/db";
import {NextApiRequest, NextApiResponse} from 'next';
import {NextResponse} from "next/server";
import * as z from "zod"
import {other_services} from "../../../../types/models"


const serviceSchema = z.object({
    id: z.number(),
    username: z.string(),
    topic: z.string(),
    description: z.string(),
    preferredSolution: z.string(),
    resolved: z.boolean()
})

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const other_services = await db.other_services.findMany({
            orderBy: {
                id: 'asc',
            },
        });
        // console.log('Fetched Fields:', fields);
        return NextResponse.json(other_services, {status: 200});
    } catch (error: any) {
        console.error('Error fetching fields:', error.message);
        return NextResponse.json('Internal Server Error' , {status: 500});
    } finally {
        await db.$disconnect();
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsedService: other_services = serviceSchema.parse(body);

        // Create a new object with the field_id from the context
        const service = await db.other_services.create({
            data: {
                ...parsedService
            },
        });

        return NextResponse.json({"service": service, message: "Field created successfully"}, {status: 200});

    } catch (error) {
        console.error("Error", error)
        return new Response("An error occurred", {status: 500});
    }
}