export const apiURLs = {
  AUTH: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    me: '/api/auth/mee',
    refresh: '/api/auth/refresh',
    changePassword: "/api/auth/changePassword",
    forgotPassword: '/api/auth/forgot-password',
    verifyResetCode: '/api/auth/verify-reset-code',
    resetPassword: '/api/auth/reset-password',
    verifyEmail: '/api/auth/verify-email',
    sendVerification: '/api/auth/send-verification',

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

  WORKSPACE: {
    create: '/api/workspace',
    getAll: '/api/workspace',
    getById: (workspaceId: string) => `/api/workspace/${workspaceId}`,
    updateById: (workspaceId: string) => `/api/workspace/${workspaceId}`,
    deleteById: (workspaceId: string) => `/api/workspace/${workspaceId}`,

    invite: {
      createLink: (workspaceId: string) =>
        `/api/workspace/${workspaceId}/invite/link`,

      createByEmail: (workspaceId: string) =>
        `/api/workspace/${workspaceId}/invite/email`,

      getActive: (workspaceId: string) =>
        `/api/workspace/${workspaceId}/invites`,

      revoke: (workspaceId: string, inviteId: string) =>
        `/api/workspace/${workspaceId}/invites/${inviteId}`,
    },

    joinByToken: (token: string) =>
      `/api/workspace/join/${token}`,

    members: {
      getAll: (workspaceId: string) =>
        `/api/workspace/${workspaceId}/members`,

      updateRole: (workspaceId: string) =>
        `/api/workspace/${workspaceId}/members`,

      remove: (workspaceId: string) =>
        `/api/workspace/${workspaceId}/members`,
    },
  },
};

