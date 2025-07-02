import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest,) => {
    const client = new PrismaClient();
    try {
        const data = await req.json()
        const {
            username,
            email,
            password
        } = data;

        const user = await client.user.create({
            data: {
                email, password, username
            }
        })

        return NextResponse.json({
            message: "User created",
            data: user
        })
    } catch (error) {
        return NextResponse.json({
            message: "Internal server error",
            data: error
        })

    }
}

export const GET = (req: NextRequest) => {
    return NextResponse.json({
        message: "working"
    })
}