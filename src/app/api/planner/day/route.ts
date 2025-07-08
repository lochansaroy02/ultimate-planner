import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
    try {
        const data = await req.json()
        const { title, description, weekId } = data;

        const day = await prisma.day.create({
            data: {
                title, description, weekId
            }
        })
        return NextResponse.json({
            message: "day  Created",
            data: day
        })
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error })
    }
}


export const GET = async (req: NextRequest) => {

    try {
        const weekId = req.nextUrl.searchParams.get("weekId");
        const days = await prisma.day.findMany({
            where: { weekId }
        })

        return NextResponse.json({
            message: "Days  data fateched",
            data: days
        })
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error })

    }

}