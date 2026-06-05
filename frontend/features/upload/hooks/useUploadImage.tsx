import { useMutation } from "@tanstack/react-query"
import { assestUploadApi } from "../upload-api"

const useUploadImage = () => {
  return useMutation({
    mutationKey: ['imageUpload'],
    mutationFn: assestUploadApi.uploadImage,
  })
}

export default useUploadImage
