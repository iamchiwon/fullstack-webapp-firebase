/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImageItem } from "../common/types/ImageItem";
import {
  databaseCreateItem,
  databaseDeleteItem,
  databaseGetList,
} from "../backend/database";
import { storageUploadFile } from "../backend/storage";

const getImageList = async () => {
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

const uploadImage = async (file: File) => {
  const url = await storageUploadFile("images", file);
  const data: Omit<ImageItem, "id"> = {
    path: file.name,
    size: file.size,
    url,
  };
  await databaseCreateItem("images", data);
};

const deleteImage = async (id: string) => {
  return await databaseDeleteItem("images", id);
};

const ImageController = {
  getImageList,
  uploadImage,
  deleteImage,
};

export default ImageController;
