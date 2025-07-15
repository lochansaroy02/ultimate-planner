import prisma from "@/utils/prisma";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const POST = async (req: NextRequest) => {
    try {
        const { email, password } = await req.json();

        const user = await prisma.user.findUnique({
            //@ts-ignore
            where: { email },
        });

        if (!user || user.password !== password) {
            return NextResponse.json({
                message: "Invalid credentials",
            }, { status: 401 });
        }

        const token = jwt.sign({
            userId: user.id,
            username: user.username,
            email: user.email
        }, JWT_SECRET, { expiresIn: "7d" });

        return NextResponse.json({
            message: "Login successful",
            token,
        });
    } catch (error) {
        return NextResponse.json({
            message: "Internal server error",
            error,
        }, { status: 500 });
    }
};
