import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
    try {
        const data = await req.json()
        const { title, description, userId } = data;

        const year = await prisma.year.create({
            data: {
                title, description, userId
            }
        })
        return NextResponse.json({
            message: "Year  Created",
            data: year
        })
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error })
    }
}

export const GET = async (req: NextRequest) => {

    try {

        const userId = req.nextUrl.searchParams.get("userId");
        const years = await prisma.year.findMany({
            where: { userId }
        })

        return NextResponse.json(
            {
                message: "year factched",
                years: years
            }
        )


    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error })

    }
}