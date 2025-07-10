import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
    try {
        const data = await req.json()
        const { title, description, yearId } = data;

        const month = await prisma.month.create({
            data: {
                title, description, yearId
            }
        })
        return NextResponse.json({
            message: "month created",
            data: month
        })
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error })
    }
}

export const GET = async (req: NextRequest) => {

    try {
        const yearId = req.nextUrl.searchParams.get("yearId");
        const months = await prisma.month.findMany({
            where: { yearId }
        })

        return NextResponse.json({
            message: "Months data fateched",
            data: months
        })
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error })

    }

}