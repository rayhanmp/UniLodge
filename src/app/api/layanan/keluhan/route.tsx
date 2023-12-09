import { NextResponse } from "next/server";
import db from "../../../../../prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        const session_id = session?.user.id

        const keluhan = await db.keluhan.findMany({
            where: {
                status: "unresolved"
            }
        })

        if (keluhan) {
            return NextResponse.json(keluhan)
        } else {
            return new NextResponse('No Unresolved Complaint', {status : 404})
        }
    } catch (error) {
        console.error(error)
        return new NextResponse('Terjadi kesalahan', {status : 500})
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const keluhan = await db.keluhan.create({
            data: {
                id_resident: body.id_resident,
                keluhan: body.keluhan,
                status: "unresolved"
            }
        })

        return NextResponse.json({keluhan: keluhan, message: 'Keluhan berhasil dibuat'}, {status: 200})
    } catch (error) {
        console.log(error)
        return new NextResponse('Something went wrong', {status: 400})
    }
}