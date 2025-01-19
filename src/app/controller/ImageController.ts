import {
  addImageAction,
  deleteImageAction,
  getImagesListAction,
} from "../actions/ImageActions";

const getImageList = async () => {
  return await getImagesListAction();
};

const uploadImage = async (file: File) => {
  await addImageAction(file);
};

const deleteImage = async (id: string) => {
  return await deleteImageAction(id);
};

const ImageController = {
  getImageList,
  uploadImage,
  deleteImage,
};

export default ImageController;
