"use client";

import { Upload, X, Download, Eye, Search } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";

export const title = "File List with Actions";

const Example = ({ onValueChange }: { onValueChange?: (files: File[]) => void }) => {
  const [files, setFiles] = React.useState<File[]>([]);

  const handleFilesChange = (newFiles: File[]) => {
    setFiles(newFiles);
    onValueChange?.(newFiles);
  };

  const handleDownload = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePreview = (file: File) => {
    const url = URL.createObjectURL(file);
    window.open(url, "_blank");
  };

  return (
    <FileUpload
      maxFiles={1}
      maxSize={5 * 1024 * 1024}
      accept="image/jpg,image/jpeg,image/png,image/webp"
      className="w-full"
      value={files}
      onValueChange={handleFilesChange}
    >
      <FileUploadDropzone className="bg-neutral-100">
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex items-center justify-center rounded-full border border-[#0a0a0a] bg-[#0a0a0a] p-2.5">
            <Upload className="size-6 text-[#fafafa]" />
          </div>
          <p className="text-sm font-medium">Sube tu imagen</p>
          <p className="text-xs text-muted-foreground">
            JPG, PNG, WebP · Máx. 5 MB
          </p>
        </div>
        <FileUploadTrigger asChild>
          <Button size="sm" className="mt-2 bg-black text-white hover:bg-black/80"><Search className="mr-1 size-4" />Buscar imagenes</Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadList>
        {files.map((file, index) => (
          <FileUploadItem key={index} value={file}>
            <FileUploadItemPreview />
            <FileUploadItemMetadata />
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={() => handlePreview(file)}
              >
                <Eye className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={() => handleDownload(file)}
              >
                <Download className="size-4" />
              </Button>
              <FileUploadItemDelete asChild>
                <Button variant="ghost" size="icon" className="size-7">
                  <X className="size-4" />
                </Button>
              </FileUploadItemDelete>
            </div>
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  );
};

export default Example;
