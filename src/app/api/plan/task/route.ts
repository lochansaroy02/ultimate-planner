import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const data = await req.json();
        const { title, description, isCompleted } = data;

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
