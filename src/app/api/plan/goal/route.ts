import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
    try {
        const data = await req.json()
        const { title, description, isCompleted } = data;

        const goal = await prisma.goal.create({
            data: {
                title, description, isCompleted
            }
        })
        return NextResponse.json({
            message: "goal Goal Created",
            data: goal
        })
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error })
    }
}

export const GET = (req: NextRequest) => {

    return NextResponse.json({
        message: "This is the goal route"
    })
}