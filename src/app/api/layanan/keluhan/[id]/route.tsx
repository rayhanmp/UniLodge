import { NextResponse } from "next/server";
import db from "../../../../../../prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        const session_id = session?.user.id

        const keluhan = await db.keluhan.findMany({
            where: {
                id_resident: session_id
            }
        })

        return NextResponse.json(keluhan)
    } catch (error) {
        console.error(error)
        return new NextResponse('Terjadi kesalahan', {status : 500})
    }
}