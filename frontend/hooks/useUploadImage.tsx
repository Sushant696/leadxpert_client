import { useMutation } from "@tanstack/react-query"

import { assestUploadAction } from "@/lib/api/upload-api";

const useUploadImage = () => {
  return useMutation({
    mutationKey: ['imageUpload'],
    mutationFn: assestUploadAction.uploadImage,
  })
}

export default useUploadImage
