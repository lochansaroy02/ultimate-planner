import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
    try {
        const data = await req.json()
        const { title, description, monthId } = data;

        const week = await prisma.week.create({
            data: {
                title, description, monthId
            }
        })
        return NextResponse.json({
            message: "week Created",
            data: week
        })
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error })
    }
}

export const GET = async (req: NextRequest) => {

    try {
        const monthId = req.nextUrl.searchParams.get("monthId");
        const weeks = await prisma.week.findMany({
            where: { monthId }
        })

        return NextResponse.json({
            message: "Weeks data fateched",
            data: weeks
        })
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error })

    }

}