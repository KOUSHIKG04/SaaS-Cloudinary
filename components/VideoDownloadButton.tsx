"use client";

import { Download } from "lucide-react";
import { Button } from "./ui/button";

interface VideoDownloadButtonProps {
  url: string;
  title: string;
}

export function VideoDownloadButton({ url, title }: VideoDownloadButtonProps) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      size="lg"
      className="gap-2 bg-green-500 hover:bg-green-500/90"
      onClick={handleDownload}
    >
      <Download className="w-5 h-5" />
      Download
    </Button>
  );
}
