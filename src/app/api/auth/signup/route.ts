import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/utils/prisma";
const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const POST = async (req: NextRequest,) => {
    try {
        const data = await req.json()
        const {
            username,
            email,
            password
        } = data;


        const existingUser = await prisma.user.findUnique({
            where: { username }
        });

        if (existingUser) {
            return NextResponse.json({
                message: "Username already taken"
            }, { status: 400 });
        }
        const user = await prisma.user.create({
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