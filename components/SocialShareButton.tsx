"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type SocialPlatform = "facebook" | "twitter" | "whatsapp" | "email";

type SocialShareButtonProps = {
  platform: SocialPlatform;
  url: string;
  title: string;
  body?: string;
  className?: string;
};

export function SocialShareButton({
  platform,
  url,
  title,
  body,
  className,
}: SocialShareButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getShareUrl = (): string => {
    switch (platform) {
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}&t=${encodeURIComponent(title)}`;
      case "twitter":
        return `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(title)}`;
      case "whatsapp":
        return `https://api.whatsapp.com/send?text=${encodeURIComponent(
          title + " " + url
        )}`;
      case "email":
        return `mailto:?subject=${encodeURIComponent(
          title
        )}&body=${encodeURIComponent((body || title) + "\n\n" + url)}`;
      default:
        return "";
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();

    if (platform === "email") {
      window.location.href = getShareUrl();
      return;
    }

    // Open in a popup window for non-email platforms
    window.open(
      getShareUrl(),
      `share-${platform}`,
      "width=600,height=400,location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1"
    );
  };

  const getIcon = () => {
    switch (platform) {
      case "facebook":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        );
      case "twitter":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
          </svg>
        );
      case "whatsapp":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.274-.101-.474-.15-.673.15-.2.3-.767.966-.94 1.164-.173.199-.347.223-.646.075-.3-.15-1.265-.465-2.411-1.485-.9-.8-1.504-1.78-1.679-2.08-.173-.3-.018-.465.13-.61.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.18 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345z" />
            <path d="M20.52 3.449C12.974-3.467.8 11.18 5.074 19.56l-2.518 6.68 6.84-2.437C21.024 28.157 28.096 10.958 20.52 3.45z" />
          </svg>
        );
      case "email":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        );
    }
  };

  const getPlatformColor = (): string => {
    switch (platform) {
      case "facebook":
        return isHovered ? "text-[#4267B2]" : "text-sweet-brown";
      case "twitter":
        return isHovered ? "text-[#1DA1F2]" : "text-sweet-brown";
      case "whatsapp":
        return isHovered ? "text-[#25D366]" : "text-sweet-brown";
      case "email":
        return isHovered ? "text-sweet-orange" : "text-sweet-brown";
      default:
        return "text-sweet-brown";
    }
  };

  return (
    <button
      onClick={handleShare}
      className={cn(
        "p-3 bg-white/80 rounded-full border border-sweet-brown/20 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sweet-orange focus-visible:ring-offset-2",
        getPlatformColor(),
        isHovered && "border-sweet-orange/40 shadow-sm transform-gpu scale-105",
        className
      )}
      aria-label={`Share on ${platform}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {getIcon()}
    </button>
  );
}
