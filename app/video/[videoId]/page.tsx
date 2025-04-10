import { getCldVideoUrl } from "next-cloudinary";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { Clock, FileDown, FileUp } from "lucide-react";
import { filesize } from "filesize";
import { VideoDownloadButton } from "@/components/VideoDownloadButton";

const prisma = new PrismaClient();

type PageProps = {
  params: Promise<{ videoId: string }>;
};

export default async function VideoPage({ params }: PageProps) {
  const { videoId } = await params;
  const video = await prisma.video.findUnique({
    where: { id: videoId },
  });

  if (!video) {
    notFound();
  }

  const videoUrl = getCldVideoUrl({
    src: video.publicId,
    width: 1920,
    height: 1080,
  });

  const formatDuration = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${min}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const compressionPercentage = Math.round(
    1 - (Number(video.compressedSize) / Number(video.originalSize)) * 100
  );

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="space-y-8">
        {/* Video Player */}
        <div className="relative rounded-xl overflow-hidden bg-black">
          <video
            src={videoUrl}
            controls
            className="w-full aspect-video"
            poster={getCldVideoUrl({
              src: video.publicId,
              width: 1920,
              height: 1080,
              format: "jpg",
            })}
          />
        </div>

        {/* Video Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">{video.title}</h1>
            <p className="text-muted-foreground">{video.description}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted/50 space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileUp className="w-4 h-4" />
                <span className="text-sm">Original Size</span>
              </div>
              <p className="font-medium text-lg">
                {filesize(Number(video.originalSize))}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-muted/50 space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileDown className="w-4 h-4" />
                <span className="text-sm">Compressed Size</span>
              </div>
              <p className="font-medium text-lg text-primary">
                {filesize(Number(video.compressedSize))}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-muted/50 space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Duration</span>
              </div>
              <p className="font-medium text-lg">
                {formatDuration(video.duration)}
              </p>
            </div>
          </div>

          {/* Compression Info */}
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-green-500 font-medium">
                  Compression Achieved
                </p>
                <p className="text-2xl font-bold text-green-500">
                  {compressionPercentage}%
                </p>
                <p className="text-sm text-muted-foreground">
                  Saved{" "}
                  {filesize(
                    Number(video.originalSize) - Number(video.compressedSize)
                  )}
                </p>
              </div>
              <VideoDownloadButton url={videoUrl} title={video.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
