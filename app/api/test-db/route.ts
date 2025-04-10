import { prisma } from "@/lib/prisma";

export async function GET() {
    try {

        await prisma.$connect();

        const count = await prisma.video.count();

        return Response.json({
            success: true,
            message: "Database connection successful",
            videoCount: count
        });
    } catch (error) {
        return Response.json({
            success: false,
            error: error instanceof Error ? error.message : "Database connection failed"
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
} 