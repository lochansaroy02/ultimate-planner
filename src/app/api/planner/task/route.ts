import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const data = await req.json();
        const { title, description, isCompleted, dayId } = data;

        if (!title || !description || typeof isCompleted !== "boolean") {
            return NextResponse.json(
                { message: "Missing or invalid required fields" },
                { status: 400 }
            );
        }

        const newTask = await prisma.task.create({
            data: {
                title,
                description,
                isCompleted,
                dayId
            },
        });

        return NextResponse.json(newTask, { status: 201 });
    } catch (error) {
        console.error("Error creating task:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 },
        );
    }
};



export const GET = async (req: NextRequest) => {
    try {
        const dayId = req.nextUrl.searchParams.get("dayId");
        const tasks = await prisma.task.findMany({
            where: { dayId }
        })

        return NextResponse.json({
            message: "task data fateched",
            data: tasks
        })
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error })

    }
}


