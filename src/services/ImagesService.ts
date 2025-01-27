"use server";

import {
  ActionResponseError,
  ActionResponseSuccess,
} from "@/common/types/ActionResponse";
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
    return ActionResponseSuccess<ImageItem[]>(images);
  } catch (error) {
    return ActionResponseError<ImageItem[]>(error);
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
    return ActionResponseSuccess();
  } catch (error) {
    return ActionResponseError(error);
  }
};

export const imagesServiceDelete = async (id: string) => {
  try {
    await databaseDeleteItem("images", id);
    return ActionResponseSuccess();
  } catch (error) {
    return ActionResponseError(error);
  }
};
