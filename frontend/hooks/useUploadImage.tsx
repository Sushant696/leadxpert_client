import { useMutation } from "@tanstack/react-query"

import { assestUploadAction } from "@/lib/api/upload-api";

const useUploadImage = () => {
  return useMutation({
    mutationKey: ['imageUpload'],
    mutationFn: assestUploadAction.uploadImage,
    onSuccess: (data) => {
      console.log('User updated successfully:', data);
    },
    onError: (error: any) => {
      console.error('Error updating user:', error);
    },
  })
}

export default useUploadImage
