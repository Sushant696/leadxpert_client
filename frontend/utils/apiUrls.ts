export const apiURLs = {
  AUTH: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    me: '/api/auth/mee',
    refresh: '/api/auth/refresh',
    changePassword: "/api/auth/changePassword"
  },
  FILE: {
    uploadImg: '/api/upload/image',
    uploadMultipleImges: '/api/upload/images',
    deleteImage: "/api/upload/image",
  },
  USER: {
    updateUser: '/api/users/update',
    getAllUsers: '/api/users',
    getUserById: (id: string) => `/api/users/${id}`,
    deleteUserById: (id: string) => `/api/users/${id}`,
  },
  FORGOTPASSWORD: {
    verifyOTP: '/api/forgotPassword/verifyOTP',
    checkEmail: '/api/forgotPassword/checkEmail',
    generateOTP: '/api/forgotPassword/generateOTP',
    changePassword: '/api/forgotPassword/changePassword',
  },
}
