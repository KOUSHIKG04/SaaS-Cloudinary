"use client";
import React, { useState, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, FileVideo } from "lucide-react";

const VideoUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const router = useRouter();
  const MAX_SIZE_FILE = 70 * 1024 * 1024;

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("video/")) {
      setFile(droppedFile);
    }
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        setFile(selectedFile);
      }
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    if (file.size > MAX_SIZE_FILE) {
      throw new Error("File is too large");
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("originalSize", file.size.toString());

    try {
      const res = await axios.post("/api/video-upload", formData);

      if (res.status === 200) {
        router.push(`/video/${res.data.videoId}`);
      } else {
        throw new Error("Failed to upload video");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-5xl font-bold text-center mt-8">Upload Video Here</h1>
      <div className="card p-4 rounded-xl flex flex-col justify-center items-center">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit} className="space-y-6 mt-8 w-[500px]">
            <div className="space-y-2">
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full"
                placeholder="VIDEO TITLE HERE"
              />
            </div>
            <div className="space-y-2">
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full min-h-[100px]"
                placeholder="DESCRIPTION HERE"
              />
            </div>
            <div className="space-y-2">
              <div
                className={`relative border-2 rounded-lg p-8 text-center transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  required
                />
                <div className="flex flex-col items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <FileVideo className="w-4 h-4 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-md font-medium">
                      {file ? file.name : "DRAG & DROP VIDEO HERE "}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      OR CLICK TO BROWSE
                    </p>
                  </div>
                  {file && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => setFile(null)}
                    >
                      REMOVE VIDEO
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <Button
                disabled={isUploading || !file}
                type="submit"
                className="px-6 py-6 text-md"
              >
                {isUploading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-transparent text-white text-sm animate-spin flex items-center justify-center border-t-white rounded-full"></div>
                    Uploading...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Upload Video
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
