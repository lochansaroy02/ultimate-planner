import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
    try {

        const data = await req.json();
        const { userId } = data

        const plan = await prisma.plan.create({
            data: { userId }
        })
        return NextResponse.json({
            message: "Month Goal Created",
            data: plan
        })
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error })
    }
}



export const GET = async (req: NextRequest) => {

    try {

        // here I need add the userId to fetch the year of related user

        const userId = req.nextUrl.searchParams.get("userId");
        const plan = await prisma.plan.findMany({
            //@ts-ignore
            where: { userId }
        })

        return NextResponse.json({
            message: "Plan Data fateched",
            data: plan
        })
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error })

    }
}