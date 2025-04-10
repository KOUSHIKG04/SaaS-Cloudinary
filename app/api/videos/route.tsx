import { prisma } from "@/lib/prisma";

export async function GET(): Promise<Response> {
  try {
    // Ensure we're connected to the database
    if (!prisma) {
      throw new Error("Prisma client is not initialized");
    }

    const videos = await prisma.video.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(videos);
  } catch (error) {
    console.error("Error in /api/videos:", error);
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch videos",
        details: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 }
    );
  }
}
