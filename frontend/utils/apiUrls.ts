export const apiURLs = {
  AUTH: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    me: '/api/auth/mee',
    refresh: '/api/auth/refresh',
    update: '/api/auth/update',
    changePassword: "/api/auth/changePassword"
  },
  FILE: {
    uploadImg: '/api/upload/image',
    uploadMultipleImges: '/api/upload/images',
    deleteImage: "/api/upload/image",
  },
  FORGOTPASSWORD: {
    verifyOTP: '/api/forgotPassword/verifyOTP',
    checkEmail: '/api/forgotPassword/checkEmail',
    generateOTP: '/api/forgotPassword/generateOTP',
    changePassword: '/api/forgotPassword/changePassword',
  },
}
