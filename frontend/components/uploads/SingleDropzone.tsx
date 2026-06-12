import React from "react";
import { useDropzone } from "react-dropzone";
import { Image, X } from "lucide-react";

interface SingleDropzoneProps {
  onFileSelect: (file: File | null) => void;
  preview: string | null;
  setPreview: (file: string | null) => void;
  url?: string | null;
}

export function SingleDropzone({
  onFileSelect,
  preview,
  setPreview,
}: SingleDropzoneProps) {
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onFileSelect(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg", ".webp"],
    },
    maxFiles: 1,
  });

  const handleClearPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onFileSelect(null);
  };

  return (
    <div className="flex flex-col w-full">
      <div
        {...getRootProps()}
        className="relative aspect-square w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
      >
        <input {...getInputProps()} />
        <div className="absolute inset-0 flex items-center justify-center">
          {preview ? (
            <div className="relative w-full h-full p-2">
              <img
                src={preview}
                alt="Preview Not Available"
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={handleClearPreview}
                className="absolute top-1 right-1 p-1.5 bg-red-500 rounded-full text-white hover:bg-red-600 shadow-sm transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="text-center p-2">
              {isDragActive ? (
                <p className="text-gray-500 text-sm">Drop the file here...</p>
              ) : (
                <div className="space-y-1">
                  <div className="w-10 h-10 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
                    <Image className="text-gray-400" size={20} />
                  </div>
                  <p className="text-gray-500 text-xs">
                    Drag & drop or click
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleDropzone;
