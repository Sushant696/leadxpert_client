import { apiURLs } from "@/utils/apiUrls";
import { apiWrapper } from "@/lib/api/api-wrapper";

const multiPartHeader = {
  "Content-Type": "multipart/form-data",
};

export const assestUploadApi = {
  uploadImage: async (image: FormData) => {
    return await apiWrapper.post(apiURLs.FILE.uploadImg, image, multiPartHeader);
  },
  uploadMultipleImages: async (images: File[]) => {
    return await apiWrapper.post(apiURLs.FILE.uploadMultipleImges, images, multiPartHeader);
  },
  deleteImage: async (data: any) => {
    return await apiWrapper.delete(apiURLs.FILE.deleteImage, data);
  },
};
