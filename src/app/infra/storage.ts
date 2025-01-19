"use server";

import { getDownloadURL, getStorage } from "firebase-admin/storage";

export const storageUploadFile = async (path: string, file: File) => {
  const storage = await getStorage();
  const bucket = storage.bucket();
  const arrayBuffer = await file.arrayBuffer();
  const fileBuffer = Buffer.from(arrayBuffer);
  const blob = bucket.file(`${path}/${file.name}`);
  await blob.save(fileBuffer, { public: true });
  const url = await getDownloadURL(blob);
  return url;
};
