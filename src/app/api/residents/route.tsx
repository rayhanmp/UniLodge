import { NextResponse } from "next/server";
import db from "../../../../prisma/db";
import { hash } from "bcrypt";
import * as z from 'zod';

const userSchema = z
    .object({
        username: z.string().min(1, "Username must not be empty"),
        email: z.string().min(1, "Email must not be empty").email("Invalid email!"),
        name: z.string().min(1, "Name must not be empty"),
        phone: z.string().min(1, "Phone must not be empty"),
        password: z
            .string()
            .min(1, "Password must not be empty")
            .min(8, "Password should have more than 8 characters"),
    })

export async function GET() {
    try {
        const users = await db.resident.findMany();
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error('Error fetching records', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("body");
        console.log(body);
        console.log(userSchema.parse(body));
        const { username, email, name, phone, password} = userSchema.parse(body);

        const isEmailUsedbyOtherUser = await db.resident.findUnique( {
            where: { email: email}
        });

        if (isEmailUsedbyOtherUser) {
            return NextResponse.json({user: null, message: "This email has been used by other user"}, {status: 409})
        }

        const isUsernameUsedbyOtherUser = await db.resident.findUnique( {
            where: { username: username}
        });

        if (isUsernameUsedbyOtherUser) {
            return NextResponse.json({user: null, message: "This username has been used by other user"}, {status: 409})
        }


        const hashedPassword = await hash(password, 10);

        const newResident = await db.resident.create ({
            data : {
                email,
                name,
                phone,
                username,
                password: hashedPassword,
            }
        })

        const { password: newResidentPassword, ...rest} = newResident;

        return NextResponse.json({resident: newResident, message: "User created succesfully!"}, {status: 201});
    } catch(error) {
        console.error('Error creating record', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}