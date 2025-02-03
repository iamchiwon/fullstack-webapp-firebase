'use client';

import {
  imagesServiceDelete,
  imagesServiceGetList,
  imagesServiceUpload,
} from '@/services/ImagesService';

const getImageList = async () => {
  const response = await imagesServiceGetList();
  if (!response.ok) {
    console.error(response.message);
    return [];
  }
  const list = response.data;
  return list;
};

const uploadImage = async (file: File) => {
  const response = await imagesServiceUpload(file);
  if (!response.ok) {
    console.error(response.message);
    return false;
  }
  return true;
};

const deleteImage = async (id: string) => {
  const response = await imagesServiceDelete(id);
  if (!response.ok) {
    console.error(response.message);
    return false;
  }
  return true;
};

const ImageController = {
  getImageList,
  uploadImage,
  deleteImage,
};

export default ImageController;
