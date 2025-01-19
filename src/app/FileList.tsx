import { useEffect, useState } from "react";
import { ImageItem } from "../common/types/ImageItem";
import { fileSizeFormatter } from "../common/utils/formatter";
import { Box, Button, Dialog, Flex } from "@radix-ui/themes";
import ImageController from "../controller/ImageController";
import Image from "next/image";

export const FileList = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileList, setFileList] = useState<ImageItem[]>([]);

  const fetchList = async () => {
    const list = await ImageController.getImageList();
    setFileList(list);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    await ImageController.uploadImage(file);
    setFile(null);
    fetchList();
  };

  const handleDelete = async (id: string) => {
    await ImageController.deleteImage(id);
    fetchList();
  };

  return (
    <Box pt="4">
      <Box className="text-2xl font-bold">File List</Box>

      <Flex gap="2">
        <input
          type="file"
          accept="image/*"
          className="border-gray-100 border-2 rounded-md p-2"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <Button onClick={handleUpload}>Upload</Button>
      </Flex>
      <Flex direction="column" gap="2">
        {fileList.map((item) => (
          <Flex gap="2" align="center" key={item.id}>
            <ImageView item={item} />
            {item.path} ({fileSizeFormatter(item.size)})
            <Button color="red" onClick={() => handleDelete(item.id)}>
              DEL
            </Button>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

const ImageView = ({ item }: { item: ImageItem }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Image
          className="cursor-pointer"
          src={item.url}
          alt={item.path}
          width={80}
          height={80}
        />
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>{item.path}</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          {fileSizeFormatter(item.size)}
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <Image src={item.url} alt={item.path} width={300} height={300} />
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button>CLOSE</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
