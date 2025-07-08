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
            message: "Year Goal Created",
            data: year
        })
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error })
    }
}

export const GET = async (req: NextRequest) => {

    try {

        // here I need add the userId to fetch the year of related user 

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