import { NextResponse } from "next/server";
import db from "../../../../../../prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request, context: {params: {id: number}}) {
    try {
        const session = await getServerSession(authOptions)
        const session_id = session?.user.id

        const keluhan = await db.keluhan.findMany({
            select: {
                id_keluhan: true,
                keluhan: true,
                respon_keluhan: {
                    select: {
                        solusi: true
                    }
                }
            },
            where: {
                id_resident: Number(context.params.id)
            }
        })

        // const keluhan = await db.$queryRaw`
        //     SELECT k.id_keluhan, k.keluhan, r.solusi
        //     FROM keluhan k
        //     LEFT JOIN respon_keluhan r ON k.id_keluhan = r.id_keluhan
        //     WHERE k.id_resident = ${Number(context.params.id)}
        // `;

        return NextResponse.json(keluhan)
    } catch (error) {
        console.error(error)
        return new NextResponse('Terjadi kesalahan', {status : 500})
    }
}