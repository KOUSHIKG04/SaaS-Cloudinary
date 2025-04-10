"use client";

import { Download } from "lucide-react";
import { Button } from "./ui/button";

interface DownloadButtonProps {
  url: string;
  title: string;
}

export function DownloadButton({ url, title }: DownloadButtonProps) {
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
      size="sm"
      className="gap-2 bg-primary hover:bg-primary/90"
      onClick={handleDownload}
    >
      <Download className="w-4 h-4" />
      Download
    </Button>
  );
}
