/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { ImageItem } from "../common/types/ImageItem";
import {
  databaseCreateItem,
  databaseDeleteItem,
  databaseGetList,
} from "../backend/database";
import { storageUploadFile } from "../backend/storage";

export const getImagesListAction = async () => {
  const images = await databaseGetList("images");
  return images.map(
    (image: any) =>
      ({
        id: image.id,
        path: image.path,
        size: image.size,
        url: image.url,
      } as ImageItem)
  );
};

export const addImageAction = async (file: File) => {
  const url = await storageUploadFile("images", file);
  const data: Omit<ImageItem, "id"> = {
    path: file.name,
    size: file.size,
    url,
  };
  await databaseCreateItem("images", data);
};

export const deleteImageAction = async (id: string) => {
  await databaseDeleteItem("images", id);
};
