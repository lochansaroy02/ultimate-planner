import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
    try {
        const data = await req.json()
        const { title, description, planId } = data;

        const year = await prisma.year.create({
            data: {
                title, description, planId
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

        const planId = req.nextUrl.searchParams.get("planId");
        const years = await prisma.year.findMany({
            where: { planId }
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