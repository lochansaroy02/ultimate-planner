import { PrismaClient } from "@prisma/client";
import { body } from "framer-motion/client";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
    const client = new PrismaClient();
    try {
        const data = await req.json()
        const { title, description, goal } = data;
        


    } catch (error) {

    }
}

export const GET = (req: NextRequest) => {

    return NextResponse.json({
        message: "This is the year route"
    })
}