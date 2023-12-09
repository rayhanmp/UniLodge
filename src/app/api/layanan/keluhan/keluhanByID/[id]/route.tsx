import { NextResponse } from "next/server";
import db from "../../../../../../../prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request, context: {params: {id: number}}) {
    try {
        const session = await getServerSession(authOptions)
        const session_id = session?.user.id

        const keluhan = await db.keluhan.findUnique({
            where: {
                id_keluhan: Number(context.params.id)
            }
        })

        return NextResponse.json(keluhan)
    } catch (error) {
        console.error(error)
        return new NextResponse('Terjadi kesalahan', {status : 500})
    }
}