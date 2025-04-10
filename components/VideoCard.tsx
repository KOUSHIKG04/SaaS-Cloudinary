"use client";

import { getCldVideoUrl } from "next-cloudinary";
import { FileDown, FileUp, Play, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Video } from "@/types";
import Link from "next/link";
import { filesize } from "filesize";

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const formatDuration = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${min}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const compressionPercentage = Math.round(
    (1 - Number(video.compressedSize) / Number(video.originalSize)) * 100
  );

  return (
    <Link href={`/video/${video.id}`} className="block">
      <div className="group relative bg-card rounded-xl border shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/20 hover:-translate-y-1">
        <figure className="relative aspect-video overflow-hidden rounded-t-xl">
          <img
            src={getCldVideoUrl({
              src: video.publicId,
              width: 1920,
              height: 1080,
              format: "jpg",
            })}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Overlay Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-black/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs flex items-center gap-1.5 font-medium">
                  <Play className="w-3 h-3" />
                  {formatDuration(video.duration)}
                </div>
                <div className="bg-green-500/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs flex items-center gap-1.5 font-medium">
                  <span className="text-green-400">●</span>
                  {compressionPercentage}% Smaller
                </div>
              </div>
            </div>
          </div>
        </figure>

        <div className="p-4 space-y-3">
          {/* Title and Description */}
          <div className="space-y-1.5">
            <h2 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors duration-300">
              {video.title}
            </h2>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {video.description}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-2.5 rounded-lg bg-muted/50 space-y-1 transform transition-all duration-300 group-hover:bg-muted/70">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <FileUp className="w-3.5 h-3.5" />
                <span>Original</span>
              </div>
              <p className="font-medium text-sm">
                {filesize(Number(video.originalSize))}
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-muted/50 space-y-1 transform transition-all duration-300 group-hover:bg-muted/70">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <FileDown className="w-3.5 h-3.5" />
                <span>Compressed</span>
              </div>
              <p className="font-medium text-sm text-primary">
                {filesize(Number(video.compressedSize))}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground">Saved:</span>
              <span className="text-sm font-medium text-green-500">
                {filesize(
                  Number(video.originalSize) - Number(video.compressedSize)
                )}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-xs"
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  getCldVideoUrl({
                    src: video.publicId,
                    width: 1920,
                    height: 1080,
                  }),
                  "_blank"
                );
              }}
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Download
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
