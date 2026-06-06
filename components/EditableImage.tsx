"use client";

import React from "react";
import { useCms } from "../lib/cms";
import { Camera } from "lucide-react";

interface EditableImageProps {
  path: string;
  className?: string;
  alt?: string;
  wrapperClassName?: string;
}

export default function EditableImage({
  path,
  className = "",
  alt = "",
  wrapperClassName = "relative group",
}: EditableImageProps) {
  const { isAdmin, draftData, triggerUpload } = useCms();

  // Helper to extract value from nested paths (e.g. "hero.image" or "services[0].image")
  const getValue = () => {
    if (!draftData) return "";
    const keys = path.replace(/\[(\d+)\]/g, ".$1").split(".");
    let current = draftData;
    for (const key of keys) {
      if (current && current !== null && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        return "";
      }
    }
    return typeof current === "string" ? current : "";
  };

  const src = getValue();

  if (!isAdmin) {
    return <img src={src || "/placeholder.jpg"} className={className} alt={alt} />;
  }

  return (
    <div className={wrapperClassName}>
      <img src={src || "/placeholder.jpg"} className={className} alt={alt} />
      
      {/* Upload trigger overlay */}
      <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 rounded-lg backdrop-blur-[2px]">
        <button
          onClick={(e) => {
            e.preventDefault();
            triggerUpload(path);
          }}
          type="button"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-white font-bold uppercase tracking-wider text-xs shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Camera size={14} /> Replace Image
        </button>
      </div>
    </div>
  );
}
