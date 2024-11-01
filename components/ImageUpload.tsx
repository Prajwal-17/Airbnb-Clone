// "use client";

import { OurFileRouter } from "@/app/api/uploadthing/core";
import { useRentHomeStore } from "@/store/rentHome";
import { UploadDropzone } from "@uploadthing/react";

const OurUploadDropzone = () => {

  const setImageUrl = useRentHomeStore((state) => state.setImageUrl);

  return (
    <UploadDropzone<OurFileRouter, "imageUploader">
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        console.log("Files: ", res);

        if (res && res.length > 0) {
          setImageUrl(res[0].url);
        }
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
      onUploadBegin={(name) => {
        console.log("Uploading: ", name);
      }}
      onDrop={(acceptedFiles) => {
        console.log("Accepted files: ", acceptedFiles);
      }}
    />
  );
};

export default OurUploadDropzone;
