"use client"

import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@uploadthing/react";

export const OurUploadDropzone = () => (
  <UploadDropzone<OurFileRouter, "imageUploader"> // Use "imageUploader" as the second type argument
    endpoint="imageUploader" // Set the correct endpoint that matches OurFileRouter's defined key
    url="http://localhost:3000" // Optional: server URL if needed for server-side rendering
    onClientUploadComplete={(res) => {
      // Handle the response after upload
      console.log("Files: ", res);
      alert("Upload Completed");
    }}
    onUploadError={(error: Error) => {
      alert(`ERROR! ${error.message}`);
    }}
    onUploadBegin={(name) => {
      // Handle actions when the upload starts
      console.log("Uploading: ", name);
    }}
    onDrop={(acceptedFiles) => {
      // Handle accepted files
      console.log("Accepted files: ", acceptedFiles);
    }}
  />
);

