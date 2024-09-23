"use client";

import { FileUploader } from "@/components/file-uploader";

export function UploadZone() {
  // const { uploadFiles, progresses, uploadedFiles, isUploading } = useUploadFile(
  //   "imageUploader",
  //   { defaultUploadedFiles: [] }
  // );

  return (
    <div className="space-y-6 w-1/2">
      <div className="border-[1px] border-muted-foreground/25 border-dashed rounded-xl p-4">
        <h3>Upload zone</h3>
        <p>Upload your file</p>
        <FileUploader
          maxFiles={4}
          maxSize={4 * 1024 * 1024}
          // progresses={progresses}
          // onUpload={uploadFiles}
          // disabled={isUploading}
        />
        {/* <UploadedFilesCard
      // uploadedFiles={uploadedFiles}
      /> */}
      </div>
    </div>
  );
}
