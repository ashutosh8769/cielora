"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon, Loader2, X } from "lucide-react";

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  className?: string;
  acceptVideo?: boolean;
}

export default function ImageUploader({ label, value, onChange, onRemove, className = "", acceptVideo = false }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");
    
    if (!isImage && (!acceptVideo || !isVideo)) {
      alert(`Please upload a valid ${acceptVideo ? 'image or video' : 'image'} file.`);
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.url) {
        onChange(data.url);
      } else {
        alert(data.error || "Failed to upload image");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred during upload.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="font-medium text-gray-800 flex justify-between items-center">
        <span>{label}</span>
        {onRemove && value && (
          <button 
            type="button" 
            onClick={onRemove}
            className="text-red-500 hover:text-red-700 p-1"
            title="Remove Image"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </label>
      
      <div 
        className={`relative border-2 border-dashed rounded-[4px] flex flex-col items-center justify-center p-4 transition-colors cursor-pointer min-h-[120px] overflow-hidden group
          ${isDragging ? "border-black bg-stone-50" : "border-gray-300 hover:border-gray-400 bg-white"}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileSelect} 
          accept={acceptVideo ? "image/*,video/*" : "image/*"} 
          className="hidden" 
        />
        
        {isUploading ? (
          <div className="flex flex-col items-center justify-center text-gray-500 gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-black" />
            <span className="text-[11px] font-medium uppercase tracking-wider">Uploading...</span>
          </div>
        ) : value ? (
          <div className="w-full h-full absolute inset-0 flex items-center justify-center bg-white p-2">
            {value.match(/\.(mp4|webm|ogg)$/i) ? (
              <video src={value} className="max-w-full max-h-full object-contain" autoPlay loop muted playsInline />
            ) : (
              <img src={value} alt="Preview" className="max-w-full max-h-full object-contain" />
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <span className="bg-white text-black text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-[2px] shadow-sm flex items-center gap-1.5">
                 <UploadCloud className="w-3.5 h-3.5" />
                 Change File
               </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500 gap-2 pointer-events-none">
            <div className="bg-stone-100 p-3 rounded-full mb-1">
              <ImageIcon className="w-5 h-5 text-gray-400" />
            </div>
            <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
              Click or Drag {acceptVideo ? 'media' : 'image'} here
            </span>
            <span className="text-[10px] text-gray-400">
              {acceptVideo ? 'JPG, PNG, WEBP, MP4' : 'JPG, PNG, WEBP'}
            </span>
          </div>
        )}
      </div>
      
      {/* URL Input removed per user request */}
    </div>
  );
}
