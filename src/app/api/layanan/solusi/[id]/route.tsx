import { NextResponse } from "next/server";
import db from "../../../../../../prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request, context: {params: {id: number}}) {
    try {
        const session = await getServerSession(authOptions)
        const session_id = session?.user.id

        const solusi = await db.respon_keluhan.findFirst({
            where: {
                id_keluhan: Number(context.params.id)
            }
        })

        if (solusi) {
            return NextResponse.json(solusi)
        } else {
            return new NextResponse('No data found for the provided id_keluhan', { status: 404 })
        }

    } catch (error) {
        console.error(error)
        return new NextResponse('Terjadi kesalahan', {status : 500})
    }
}

export async function POST(req: Request, context: {params: {id: number}}) {
    try {
        const session = await getServerSession(authOptions)
        const session_id = session?.user.id

        const body = await req.json()

        const solusi = await db.respon_keluhan.create({
            data: {
                id_keluhan: Number(context.params.id),
                solusi: body.solusi
            }
        })

        return NextResponse.json({solusi: solusi, message: 'Solusi berhasil dibuat'}, {status: 200})
    } catch (error) {
        console.log(error)
        return new NextResponse('Something went wrong', {status: 400})
    }
}