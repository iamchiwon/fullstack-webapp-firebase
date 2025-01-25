"use server";

import { ImageItem } from "@/common/types/ImageItem";
import {
  databaseCreateItem,
  databaseDeleteItem,
  databaseGetList,
} from "@/libs/firebase/database";
import { storageUploadFile } from "@/libs/firebase/storage";

export const imagesServiceGetList = async () => {
  try {
    const images = await databaseGetList<ImageItem>("images");
    return {
      result: "success",
      data: images,
    };
  } catch (error) {
    return {
      result: "error",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const imagesServiceUpload = async (file: File) => {
  try {
    const url = await storageUploadFile("images", file);
    const data: Omit<ImageItem, "id"> = {
      path: file.name,
      size: file.size,
      url,
    };
    await databaseCreateItem("images", data);
    return {
      result: "success",
    };
  } catch (error) {
    return {
      result: "error",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const imagesServiceDelete = async (id: string) => {
  try {
    await databaseDeleteItem("images", id);
    return {
      result: "success",
    };
  } catch (error) {
    return {
      result: "error",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
