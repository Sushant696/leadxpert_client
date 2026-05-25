export const apiURLs = {
  AUTH: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    me: '/api/auth/mee',
    refresh: '/api/auth/refresh',
    update: '/api/auth/update',
  },
  FILE: {
    uploadImg: '/api/assets/uploadImg',
  },
  FORGOTPASSWORD: {
    verifyOTP: '/api/forgotPassword/verifyOTP',
    checkEmail: '/api/forgotPassword/checkEmail',
    generateOTP: '/api/forgotPassword/generateOTP',
    changePassword: '/api/forgotPassword/changePassword',
  },
}
