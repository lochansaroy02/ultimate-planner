import prisma from "@/utils/prisma";
import { body } from "framer-motion/client";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
    try {
        const data = await req.json()
        const { title, description } = data;

        const month = await prisma.month.create({
            data: {
                title, description
            }
        })
        return NextResponse.json({
            message: "Month Goal Created",
            data: month
        })
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error })
    }
}

export const GET = (req: NextRequest) => {

    return NextResponse.json({
        message: "This is the year route"
    })
}