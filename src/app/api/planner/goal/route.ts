import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const data = await req.json();
        const { title, description, isCompleted, yearId, monthId, weekId, dayId } = data;

        if (!title || !description || isCompleted === undefined) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        if (!yearId && !monthId && !weekId && !dayId) {
            return NextResponse.json({ message: "At least one of yearId, monthId, weekId, or dayId must be provided" }, { status: 400 });
        }
        const goal = await prisma.goal.create({
            data: {
                title,
                description,
                isCompleted,
                yearId,
                monthId,
                weekId,
                dayId
            }
        });

        const levelInfo = Object.entries({ yearId, monthId, weekId, dayId })
            .filter(([_, value]) => value !== null)
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
        return NextResponse.json({
            message: "Goal created successfully",
            data: {
                id: goal.id,
                title: goal.title,
                description: goal.description,
                isCompleted: goal.isCompleted,
                ...levelInfo
            }
        });

    } catch (error) {
        console.error("Error creating goal:", error);
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
    }
};
