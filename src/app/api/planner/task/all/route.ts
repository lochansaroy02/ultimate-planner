import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const tasks = await prisma.task.findMany();
        return NextResponse.json({
            message: "task data fateched",
            data: tasks
        })
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error })
    }
}
