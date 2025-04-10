"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import VideoCard from "@/components/VideoCard";
import { Video } from "@/types";

const Home = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = useCallback(async () => {
    try {
      setError(null);
      const res = await axios.get("/api/videos");
      if (Array.isArray(res.data)) {
        setVideos(res.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch videos"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  if (loading) {
    return (
      <div className="gap-4 w-full flex items-center justify-center mt-8 h-[400px]">
        <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-8 p-8">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-bold flex items-center justify-center">
            Error
          </h1>
        </div>
        <div className="flex items-center justify-center h-[400px] text-red-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-bold flex items-center justify-center">
          VIDEOS
        </h1>
      </div>
      {videos.length === 0 ? (
        <div className="flex items-center justify-center h-[400px] text-muted-foreground">
          NO VIDEOS FOUND
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
