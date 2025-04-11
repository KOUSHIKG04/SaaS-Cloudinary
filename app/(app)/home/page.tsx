"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import VideoCard from "@/components/VideoCard";
import { Video } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Home = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  const fetchVideos = useCallback(async () => {
    if (!isSignedIn) return;

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
  }, [isSignedIn]);

  useEffect(() => {
    let mounted = true;

    if (mounted && isSignedIn) {
      fetchVideos();
    }

    return () => {
      mounted = false;
    };
  }, [fetchVideos, isSignedIn]);

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Home;
