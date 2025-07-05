import prisma from "@/utils/prisma";
import { body } from "framer-motion/client";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
    try {
        const data = await req.json()
        const { title, description } = data;
        const year = await prisma.year.create({
            data: {
                title, description,
                //@ts-ignore
                months: [], goals: []

            }
        })
        return NextResponse.json({
            message: "Year Goal Created",
            data: year
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